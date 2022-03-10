import requests

response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username':'admin@localhost', 'password': 'adminadmin'})
print(response.status_code) # {'token': ''}
print(response.json()) # {'token': ''}
