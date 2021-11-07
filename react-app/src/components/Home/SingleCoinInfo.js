import { useHistory } from 'react-router-dom';
import Charts from './Charts';

const SingleCoinInfo = ({targetCoin})=> {


    return (

        targetCoin.info ? (
        <div id='coin_description_page'>
            <button onClick={() => window.location.reload(false)} className='back_btn'>&laquo; All Coins</button>
            <img id='search_crypto_logo' src={targetCoin.info?.iconUrl} alt='icon'/>
                <Charts className='priceChart' coinData={targetCoin.info?.history} coinDataColor={targetCoin.info?.color}/>
            <table id='customers'>
                <thead>
                    <tr>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Name</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Rank</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Price</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Circulating Supply</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Market Cap</th>
                        <th style={{backgroundColor: targetCoin.info?.color}}>Volume</th>
                    </tr>
                    <tr>
                        <td>{targetCoin.info?.name}</td>
                        <td>{targetCoin.info?.rank}</td>
                        <td>${targetCoin.info?.price}</td>
                        <td>{targetCoin.info?.circulatingSupply}</td>
                        <td>{targetCoin.info?.marketCap}</td>
                        <td>{targetCoin.info?.volume}</td>
                    </tr>
                </thead>
            </table>
            <div></div>
            <p
                dangerouslySetInnerHTML={{ __html: targetCoin.info?.description}}
                id='coin_description'
            />
        </div>)
        :

        (<h2>Data for this specific Crypto is not available at the moment please try again later or check out another coin!</h2>)
    )
        
}

export default SingleCoinInfo