
from fastapi import APIRouter, Depends, HTTPException
from .users import *
import requests


funds = APIRouter()

@funds.get("/fetch-mutual-fund-nav")
def fetch_mutual_fund_nav(token: str = Depends(oauth2_scheme)):
    """
    Fetches the latest mutual fund NAV (Net Asset Value) from a third-party API.

    Args:
        token (str): OAuth2 token for authentication (currently unused in the function).

    Returns:
        dict: JSON response containing the latest mutual fund NAV data.

    Raises:
        HTTPException: If there is an HTTP error from the third-party API or if the response content is not JSON.
        HTTPException: If a general request exception occurs while communicating with the third-party API.

    """
    url = "https://latest-mutual-fund-nav.p.rapidapi.com/latest"
    headers = {
        "x-rapidapi-key": "e34b5423c7msh5996869fb7d27f8p1a2fb6jsnad426552899c",
        "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()  # Return the JSON response directly
    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=response.status_code, detail=str(http_err))
    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=500, detail=str(err))
    except ValueError:
        raise HTTPException(status_code=500, detail="Response content is not JSON.")