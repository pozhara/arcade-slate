release: python manage.py makemigrations && python manage.py migrate
api: gunicorn drf_api.wsgi
web: serve -s build