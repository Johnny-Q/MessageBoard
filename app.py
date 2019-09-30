from flask import Flask, render_template, request
app = Flask(__name__)
color = ""

@app.route("/")                     #route is the website path
@app.route("/home")                 #can have multiple routes connected to one function
def main():
    #return "<h1>Home Page!</h1>"   #can return single html tags or an entire page
    print(color)
    return render_template('home.html', color=color)

@app.route("/about")
def about():
    print(color)
    return render_template("about.html", color=color)

@app.route("/color", methods=["GET"])
@app.route("/color?<color>", methods=["GET"])
def changeColor():  
    global color
    if(str(request.args.get("color")) != "None"):
        color = request.args.get("color")
        print (color)
    return render_template("color.html", color=color)

if __name__ == '__main__':
    app.run(debug=True)