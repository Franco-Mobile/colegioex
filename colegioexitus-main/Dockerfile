FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt || true

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "${START_COMMAND:-uvicorn main:app --host 0.0.0.0 --port 8000}"]