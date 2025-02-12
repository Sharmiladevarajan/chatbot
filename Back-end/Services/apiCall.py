import httpx


def postRequestWithEncode(url, data, header):
    with httpx.Client() as client:
        try:
            response = client.post(url, data=data, headers=header)
            return response
        except Exception as e:
            print(e)
            return e


def postRequest(url, data, header):
    with httpx.Client() as client:
        try:
            response = client.post(url, json=data, headers=header)
            return response
        except Exception as e:
            print(e)
            return e


def getRequest(url, header):
    with httpx.Client() as client:
        try:
            response = client.get(url, headers=header)
            return response
        except Exception as e:
            print(e)
            return e



