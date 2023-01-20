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
    
    def setUser(self, name, email):
        sql = "insert into kakaouser (name, email) values (%s, %s)"
        self.cursor.execute(sql, (name, email))
        self.db.commit()
        self.db.close()

    def findByName(self, name):
        sql = "select * from kakaouser where name = (%s)"
        self.cursor.execute(sql, name)
        data = self.cursor.fetchone()
        self.db.commit()
        self.db.close()
        return data
