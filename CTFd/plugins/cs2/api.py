from flask_restx import Namespace, Resource

from CTFd.api import CTFd_API_v1
from CTFd.models import Teams, Solves
from CTFd.utils import get_config
from CTFd.utils.dates import ctf_started, ctf_ended

cs2_namespace = Namespace("cs2", "Endpoint to retrieve CS2 data")


@cs2_namespace.route("/ctf-status")
class CTFStatus(Resource):
    @cs2_namespace.doc(
        description="Get the current CTF status",
        responses={
            200: "Success",
        },
    )
    def get(self):
        return {
            "success": True,
            "data": {
                "started": ctf_started(),
                "ended": ctf_ended(),
                "startAt": get_config("start"),
                "endAt": get_config("end"),
            },
        }


@cs2_namespace.route("/first-blood")
class FirstBlood(Resource):
    @cs2_namespace.doc(
        description="Get the first blood of every challenge",
        responses={
            200: "Success",
        },
    )
    def get(self):
        solves = Solves.query.order_by(Solves.date.asc()).all()
        first_blood = {}
        for solve in solves:
            challenge_id = solve.challenge_id
            if challenge_id not in first_blood:
                first_blood[challenge_id] = solve.team_id
        return {
            "success": True,
            "data": list(
                map(
                    lambda item: {
                        "challenge_id": item[0],
                        "team_id": item[1],
                    },
                    first_blood.items(),
                )
            ),
        }


@cs2_namespace.route("/standings")
class Standings(Resource):
    @cs2_namespace.doc(
        description="Get the current standings",
        responses={
            200: "Success",
        },
    )
    def get(self):
        teams = Teams.query.filter(Teams.banned == False, Teams.hidden == False).all()
        result = [None] * len(teams)

        teams_with_score = list(filter(lambda team: team.score > 0, teams))
        teams_without_score = list(
            sorted(
                filter(lambda team: team.score == 0, teams), key=lambda team: team.id
            )
        )
        for team in teams_with_score:
            result[team.get_place(numeric=True) - 1] = {
                "id": team.id,
                "name": team.name,
                "score": team.score,
                "solves": len(team.solves),
                "fails": len(team.fails),
            }
        for i in range(len(teams_without_score)):
            result[i + len(teams_with_score)] = {
                "id": teams_without_score[i].id,
                "name": teams_without_score[i].name,
                "score": teams_without_score[i].score,
                "solves": len(teams_without_score[i].solves),
                "fails": len(teams_without_score[i].fails),
            }
        return {"success": True, "data": result}


def load_api():
    CTFd_API_v1.add_namespace(cs2_namespace)
