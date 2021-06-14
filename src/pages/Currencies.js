import React, {useEffect, useState} from 'react';
import ChartViewer from "../components/ChartViewer";
import '../style/style.css';
import {CryptoRepo} from "../services/CryptoRepo";

export default function Currencies() {
    const [cryptos, setCryptos] = useState([]);
    const [colors] = useState([
        '',
        '#FF8829',
        '#6063E2',
        '#C3A734',
        '#A800E6',
        '#004BDB',
        '#000000',
        '#FFDC16'
    ]);

    useEffect(() => {
        CryptoRepo.getAll().then(res => {
            setCryptos(res.data);
        });
    }, [setCryptos]);

    const printCharts = () => {
        return cryptos.map((crypto, i) => {
            if (crypto.id === 7) return null;
            return (
                <div key={i} className="column is-three-fifths-desktop is-four-fifths-mobile is-centered">
                    <div className="crypto-title">
                        <img src={`/img/${crypto.nome}-logo.png`} alt={`${crypto.nome} Logo`}/>
                        <span className="crypto-name" style={{color: colors[crypto.id]}}>{crypto.nome}</span>
                        <span className="crypto-value">Valore attuale: {crypto.valore}€</span>
                    </div>
                    <ChartViewer title={crypto.nome} data={crypto.history} color={colors[crypto.id]}/>
                </div>);
        });
    };

    return (
        <div>
            <span className="titlepage">Il mercato nelle ultime 24 ore</span>
            <div className="charts-container">
                {printCharts()}
            </div>
        </div>
    );
}
