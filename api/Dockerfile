FROM python:3.8

EXPOSE 5000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

ENTRYPOINT ["flask", "run", "--host=0.0.0.0"]