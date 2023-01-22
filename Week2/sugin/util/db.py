import pymysql

class database():
    def __init__(self):
        self.db = pymysql.connect(
            host='localhost',
            user='root',
            password='pwd',
            db='back_study',
            charset='utf8'
        )
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)
    
    def signup(self, email, pwd):
        try:
            sql = "insert into user (email, password) values (%s, %s)"
            self.cursor.execute(sql, (email, pwd))
            self.db.commit()
        except Exception as e:
            print("DB ERROR : ", e)
        finally:
            self.db.close()
    
    def overlapEmail(self, email):
        sql = "select email from user where email=(%s)"
        self.cursor.execute(sql, email)
        data = self.cursor.fetchall()
        self.db.commit()
        self.db.close()
        return data
    
    def login(self, email, pwd):
        sql = "select email, password from user where email=(%s) and password=(%s)"
        self.cursor.execute(sql, (email, pwd))
        data = self.cursor.fetchone()
        self.db.commit()
        self.db.close()
        return data
    
    def saveSession(self, cookie, session):
        try:
            sql = "insert into sessions (session_id, data) values (%s, %s)"
            self.cursor.execute(sql, (cookie, session['data']))
            self.db.commit()
        except Exception as e:
            print("DB ERROR : ", e)
        finally:
            self.db.close()