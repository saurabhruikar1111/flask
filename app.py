from flask import Flask,render_template,jsonify,request
import mysql.connector as c
from flask_cors import CORS
import yfinance as yf



con = c.connect(host='database-2.crbfgwhj5p1t.ap-south-1.rds.amazonaws.com' , user = 'admin' , password = 'Mydb1234' , database='stocks')
app= Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/f')  # serach request dropdown
def home():
    data1 = request.args.get('stock_name')
    print(data1)
    cursor = con.cursor()
    new_str = '%' + data1 + '%'
    data=cursor.execute("select name,symbol from equity where name like %s",(new_str,) )
    

    data=cursor.fetchall()
    #print(data)
    info={}
    if data:
        for entry in data:
            info[entry[0]]=entry[1]
        return jsonify(info)

    #print(data)
    return jsonify({})

@app.route('/search') # followup request
def home1():
    data = request.args.get('sym')
    symstr= data+'.NS'
    stockdata=yf.Ticker(symstr)
    params=['currentPrice','pegRatio','debtToEquity','ebitdaMargins','revenueGrowth']
    dic={}
    for param in params:
        dic[param] = stockdata.info[param] if stockdata.info[param] is not None else 'unknown'

    print(data)
    return jsonify(dic)

app.run(port=5000,debug=True)

# host = 'database-2.crbfgwhj5p1t.ap-south-1.rds.amazonaws.com'
# user='admin'
# password = 'Mydb1234'
