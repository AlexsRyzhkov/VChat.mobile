FROM python:latest

WORKDIR /backend

COPY ./app /backend/app
COPY ./main.py /backend/main.py
COPY ./poetry.lock /backend/poetry
COPY ./pyproject.toml /backend/pyproject.toml
COPY ./requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt

CMD uvicorn main:app --host 0.0.0.0 --port 8000

EXPOSE 8000