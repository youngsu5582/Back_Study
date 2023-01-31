from myapp.db.models import Post

class getList:
    def getMost(cnt):
        return Post.objects.order_by('-views')[0:cnt]

    def getRecent(cnt):
        return Post.objects.order_by('-postId')[0:cnt]

class search:
    def getTitle(txt):
        return Post.objects.filter(title__icontains=txt)
    def getContent(txt):
        return Post.objects.filter(content__icontains=txt)
    def getWriter(txt):
        return Post.objects.filter(userId_id=txt)