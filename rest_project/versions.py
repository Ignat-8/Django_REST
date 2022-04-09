import requests


response = requests.get('http://127.0.0.1:8000/api/users/') 
print('version = v1')
print(response.json())

response = requests.get('http://127.0.0.1:8000/api/users/', 
                        headers={'Accept': 'application/json; version=v2'}) 
print('\nversion = v2')
print(response.json())