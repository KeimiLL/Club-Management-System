FROM python:3.11.3-slim-buster

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc
RUN pip install --upgrade pip
RUN pip install pipenv
COPY Pipfile Pipfile.lock /usr/src/app/
RUN pipenv sync --dev

COPY . .

EXPOSE 8000

CMD ["/usr/src/app/start.sh"]
