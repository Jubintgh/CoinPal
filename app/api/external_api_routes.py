from flask import Blueprint, request
from logging import info
from typing import DefaultDict
from flask.blueprints import Blueprint
import requests


external_market_routes = Blueprint('market', __name__)

@external_market_routes.route('/search')
def get_coin_info():

    search = request.args.get('crypto')
    url= f'https://api.coinranking.com/v2/search-suggestions?query={search}'

    headers = {
        'x-rapidapi-key': "coinrankinge5b7fd7ce6ceeb2146bdecf169639ed7f66a32eba3b37822"
    }

    response = requests.request("GET", url, headers=headers)

    res = response.json()

    return {'allMarkets': res}


@external_market_routes.route('/coins')
def get_coins():

    time = request.args.get('time')
    if not time:
        time = '30d'
    url = f'https://api.coinranking.com/v2/coins?timePeriod={time}'

    headers = {
        'x-rapidapi-host': "coinranking1.p.rapidapi.com",
        'x-rapidapi-key': "coinrankinge5b7fd7ce6ceeb2146bdecf169639ed7f66a32eba3b37822"
    }

    response = requests.request("GET", url, headers=headers)

    all_info = response.json()
    
    all_coins = [ {
        
        info['symbol']: {
            # 'id': info['id'],
            'rank': info['rank'],
            'name': info['name'],
            'price': info['price'],
            # 'circulatingSupply': info['circulatingSupply'],
            'marketCap': info['marketCap'],
            # 'volume': info['volume'],
            # 'description': info['description'],
            'history': info['sparkline'],
            'color': info['color'],
            'iconUrl': info['iconUrl'],

        } for info in all_info['data']['coins']}]

    if all_info['status'] == "success":
        return {'allCoins': all_coins}
    else:
        return {'erros': 'something went wrong with the server'}, 500

@external_market_routes.route('/info')
def get_markets():

    time = request.args.get('time')
    if not time:
        time = '30d'
    url = f'https://api.coinranking.com/v2/coins?timePeriod={time}'

    headers = {
        'x-rapidapi-host': "coinranking1.p.rapidapi.com",
        'x-rapidapi-key': "coinrankinge5b7fd7ce6ceeb2146bdecf169639ed7f66a32eba3b37822"
        }

    response = requests.request("GET", url, headers=headers)
    all_info = response.json()

    all_markets = [ {
    
    info['name']: {
        'id': info['id'],
        # 'id': info['id'],
        'marketShare': "12.2209741947213",
        # 'marketShare': info['marketShare'],
        'numberOfMarkets': 3,
        # 'numberOfMarkets': info['numberOfMarkets'],
        'rank': 1,
        # 'rank': info['rank'],
        'volume': 6554685985.623574,
        # 'volume': info['volume'],
        'description': "Binance is a blockchain ecosystem cryptocurrency exchange.",
        # 'description': info['description'],
        'verified': True,
        # 'verified': info['verified'],
        'iconUrl': "https://cdn.coinranking.com/mDTK5qrmq/binance.svg",
        # 'iconUrl': info['iconUrl'],
    } for info in all_info['data']['exchanges']}]

    if all_info['status'] == "success":
        return {'allMarkets': all_markets}
    else:
        return {'erros': 'something went wrong with the server'}, 500