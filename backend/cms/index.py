"""
API для панели управления сайтом отряда «Руки добра».
Управление блогом, историями животных и заявками волонтёров.
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def ok(data):
    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps(data, ensure_ascii=False, default=str)}

def err(msg, code=400):
    return {'statusCode': code, 'headers': CORS_HEADERS, 'body': json.dumps({'error': msg}, ensure_ascii=False)}

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    resource = params.get('resource', '')
    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        # ── BLOG POSTS ──────────────────────────────────────────────
        if resource == 'blog':
            if method == 'GET':
                cur.execute("SELECT * FROM blog_posts ORDER BY published_at DESC")
                return ok(cur.fetchall())

            if method == 'POST':
                cur.execute(
                    "INSERT INTO blog_posts (title, excerpt, content, tag, published_at) VALUES (%s,%s,%s,%s,%s) RETURNING *",
                    (body['title'], body['excerpt'], body.get('content', ''), body.get('tag', 'Новости'), body.get('published_at', 'NOW()'))
                )
                conn.commit()
                return ok(cur.fetchone())

            if method == 'PUT':
                cur.execute(
                    "UPDATE blog_posts SET title=%s, excerpt=%s, content=%s, tag=%s, published_at=%s WHERE id=%s RETURNING *",
                    (body['title'], body['excerpt'], body.get('content', ''), body.get('tag', 'Новости'), body.get('published_at'), body['id'])
                )
                conn.commit()
                return ok(cur.fetchone())

            if method == 'DELETE':
                cur.execute("DELETE FROM blog_posts WHERE id=%s", (params.get('id'),))
                conn.commit()
                return ok({'success': True})

        # ── ANIMAL STORIES ──────────────────────────────────────────
        if resource == 'stories':
            if method == 'GET':
                cur.execute("SELECT * FROM animal_stories ORDER BY created_at DESC")
                return ok(cur.fetchall())

            if method == 'POST':
                cur.execute(
                    "INSERT INTO animal_stories (name, place, story, icon, color) VALUES (%s,%s,%s,%s,%s) RETURNING *",
                    (body['name'], body.get('place', 'г. Кинешма'), body['story'], body.get('icon', '🐾'), body.get('color', 'bg-orange-50'))
                )
                conn.commit()
                return ok(cur.fetchone())

            if method == 'PUT':
                cur.execute(
                    "UPDATE animal_stories SET name=%s, place=%s, story=%s, icon=%s, color=%s WHERE id=%s RETURNING *",
                    (body['name'], body.get('place', 'г. Кинешма'), body['story'], body.get('icon', '🐾'), body.get('color', 'bg-orange-50'), body['id'])
                )
                conn.commit()
                return ok(cur.fetchone())

            if method == 'DELETE':
                cur.execute("DELETE FROM animal_stories WHERE id=%s", (params.get('id'),))
                conn.commit()
                return ok({'success': True})

        # ── VOLUNTEER APPLICATIONS ──────────────────────────────────
        if resource == 'applications':
            if method == 'GET':
                cur.execute("SELECT * FROM volunteer_applications ORDER BY created_at DESC")
                return ok(cur.fetchall())

            if method == 'POST':
                cur.execute(
                    "INSERT INTO volunteer_applications (name, phone, email, motivation) VALUES (%s,%s,%s,%s) RETURNING *",
                    (body['name'], body['phone'], body.get('email', ''), body.get('motivation', ''))
                )
                conn.commit()
                return ok(cur.fetchone())

            if method == 'PUT':
                cur.execute(
                    "UPDATE volunteer_applications SET status=%s WHERE id=%s RETURNING *",
                    (body['status'], body['id'])
                )
                conn.commit()
                return ok(cur.fetchone())

            if method == 'DELETE':
                cur.execute("DELETE FROM volunteer_applications WHERE id=%s", (params.get('id'),))
                conn.commit()
                return ok({'success': True})

        return err('Not found', 404)

    finally:
        cur.close()
        conn.close()
