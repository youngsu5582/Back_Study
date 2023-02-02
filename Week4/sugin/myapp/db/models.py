from django.db import models

class User(models.Model):
    userId = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

class Post(models.Model):
    postId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=500)
    content = models.TextField()
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField()
    views = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)

class Comment(models.Model):
    commentId = models.AutoField(primary_key=True)
    content = models.CharField(max_length=500)
    author = models.CharField(max_length=255)
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField