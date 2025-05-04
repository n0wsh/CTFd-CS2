from functools import wraps
from flask import Response

from werkzeug.wrappers.json import JSONMixin

from CTFd.utils.user import get_current_team
from CTFd.utils.dates import ctftime

from .config import config
from .webhook import CS2Webhook
from .api import load_api


def load(app):
    config(app)

    if not app.config.get("CS2_WEBHOOK_URL"):
        print("[CS2] Webhook URL not set. Plugin disabled.")
        return

    webhook = CS2Webhook(
        app.config["CS2_WEBHOOK_URL"], app.config["CS2_WEBHOOK_SECRET"]
    )

    app.db.create_all()
    load_api()

    def challenge_attempt_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            result = f(*args, **kwargs)
            print("result:", result)

            if not ctftime():
                return result

            # Initialize data as an empty dictionary in case result is not an instance of JSONMixin
            data = {}

            if isinstance(result, Response):
                try:
                    data = result.get_json()  # Get JSON content from the Response
                except Exception as e:
                    print(f"Error parsing JSON: {e}")

            success = False
            print("data:", data)
            if (
                isinstance(data, dict)
                and data.get("success") == True
                and isinstance(data.get("data"), dict)
            ):
                success = data.get("data").get("status") == "correct"

            team = get_current_team()

            webhook.send_payload(
                {
                    "type": "submission",
                    "success": success,
                    "team": {"id": team.id, "name": team.name},
                }
            )
            return result

        return wrapper

    # Wrap the existing challenge submission route
    app.view_functions["api.challenges_challenge_attempt"] = (
        challenge_attempt_decorator(
            app.view_functions["api.challenges_challenge_attempt"]
        )
    )
