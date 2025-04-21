import flask, sys

app = flask.Flask(__name__)

@app.route("/")
def home():
    return "hello!"

app.run(host="0.0.0.0", port=int(sys.argv[1]))