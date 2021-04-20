from flask import Flask, jsonify, send_from_directory, abort, render_template
from dotenv import load_dotenv
import os
from urllib.parse import urljoin

load_dotenv()
app = Flask(__name__, static_url_path='')

def ok(data):
    return {"ok": True, "data": data}


def err(error=[]):
    return {"ok": False, "err":error}


@app.route('/static/<path:path>', methods=['GET'])
def file(path):
    return send_from_directory('static', path)


@app.errorhandler(404)
@app.route('/', methods=['GET'])
def index(_=''):
    return render_template('index.html', js=urljoin(os.getenv('DOMAIN'), '/static/main.js'))


@app.route('/api/greeting/<string:name>', methods=['GET'])
def get_companies(name):
    return jsonify(ok({"name": name}))


if __name__ == '__main__':
    app.run()
