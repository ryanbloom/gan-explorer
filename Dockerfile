FROM python:3.7

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY models ./models
COPY stylegan2 ./stylegan2
COPY dist ./dist
COPY server.py .

CMD [ "python", "server.py"]
