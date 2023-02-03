from django_seed import Seed
from myapp.db.models import User, Post
from faker import Faker
import random

class testData:
    def handleUser(self, total):
        seeder = Seed.seeder()
        seeder.add_entity(
            User,
            total,
            {
                "email": lambda x: seeder.faker.email(),
                "password": lambda x: seeder.faker.password(),
            }
        )
        seeder.execute()
        print(f"{total} data were created")
        return User.objects.all()

    def handlePost(self, total):
        user = User.objects.all()
        seeder = Seed.seeder()
        seeder.add_entity(
            Post,
            total,
            {
                "title": lambda x: seeder.faker.sentence(),
                "content": lambda x: seeder.faker.text(),
                "userId" : lambda x: random.choice(user),
                "date": lambda x: seeder.faker.date_time(),
                "views": lambda x: seeder.faker.pyint(),
                "like_count": lambda x: seeder.faker.pyint(),
            }
        )
        seeder.execute()
        print(f"{total} data were created")
        return Post.objects.all()