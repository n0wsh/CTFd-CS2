from os import environ


# Adapted from https://github.com/sigpwny/ctfd-discord-webhook-plugin/blob/master/config.py
def config(app):
    """
    Webhook URL to send data to. Set to None to disable plugin entirely.
    """
    app.config["CS2_WEBHOOK_URL"] = environ.get("CS2_WEBHOOK_URL")
    """
	Webhook signing secret. Signature will be included in X-CS2-Signature header.
	"""
    app.config["CS2_WEBHOOK_SECRET"] = environ.get("CS2_WEBHOOK_SECRET")
