from flask import Flask
from flask import jsonify
from flask import render_template
from model import Model

app = Flask(__name__)

@app.route('/')
def hello_world():
  return render_template("index.html")
  #return redirect("/static/ui/index.html")

@app.route('/api/car')
def get_vehicle():
  global model
  return jsonify(model.get())

@app.route('/api/car/<name>')
def get_measurement(name):
  try:
    global model
    return jsonify({name:model.get(name)})
  except Exception as ex:
    return ex

if __name__ == '__main__':
  model = Model()
  app.run(host="0.0.0.0")

