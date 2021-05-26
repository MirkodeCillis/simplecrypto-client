import React, {useEffect, useState} from "react";
import {CryptoRepo} from "../services/CryptoRepo";
import swal from "sweetalert2";
import Cookies from "js-cookie";
import {useAuth} from "../app/auth";

export default function BuynSell(props) {
    const auth = useAuth();
    const {REACT_APP_COOKIENAME} = process.env;
    const [cryptos, setCryptos] = useState([]);
    const [colors] = useState([
        '',
        '#FF8829',
        '#6063E2',
        '#C3A734',
        '#A800E6',
        '#004BDB',
        '#000000'
    ]);

    useEffect(() => {
        CryptoRepo.getAll().then(res => {
            setCryptos(res.data);
        });
    }, [setCryptos]);

    const printAssets = () => {
        return cryptos.map((crypto, i) => {
            if (crypto.id === 7) return (<div style={{display: "none"}} />);

            return (
                <div key={i} className="column is-one-fifths-desktop is-four-fifths-mobile is-centered">
                    <div className="asset-tile-buy">
                        <div className="crypto-title">
                            <img src={`/img/${crypto.nome}-logo.png`} alt={`${crypto.nome} Logo`}/>
                            <span className="crypto-name" style={{color: colors[crypto.id]}}>{crypto.nome}</span>
                        </div>
                        <span className="crypto-value">@ {crypto.valore}€</span>
                        <button className="button is-primary" onClick={() => { modalBuy(crypto) }}>Compra</button>
                        <button className="button is-success" onClick={() => { modalSell(crypto) }}>Vendi</button>
                    </div>
                </div>
            );
        });
    };

    const modalBuy = async (crypto) => {
        const swalval = await swal.fire({
            title: `Quanto desideri investire in ${crypto.nome}?`,
            focusConfirm: false,
            html: ' <input class="swal2-input" id="newvalue" type="number" step="0.01" min="0" placeholder="Importo in Euro" /> €',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: "Annulla",
            cancelButtonColor: 'grey',
            confirmButtonText: 'Investi!',
            background: "#f2f6fa",
            confirmButtonColor: '#0F6FFF',
            preConfirm: () => ({
                importo: document.getElementById('newvalue').value
            })
        });
        let val = swalval && (swalval.value || swalval.dismiss);
        if (val && val.importo ) {
            buyAsset(crypto, val.importo);
        }
    };

    const modalSell = (crypto) => {

    };

    const buyAsset = (crypto, importo) => {
        const value = importo / crypto.valore;
        const data = {
            crypto_id: crypto.id,
            user_id: auth.user.id,
            importo: value
        };
        CryptoRepo.buy(data,
            Cookies.get(REACT_APP_COOKIENAME)).then( res => {
                swal.fire({
                    titleText: "Login effettuato!",
                    text: "Bentornato! Sei pronto a investire ancora?",
                    icon: "success",
                    background: "#f2f6fa",
                    confirmButtonColor: '#0F6FFF'
                });
            }).catch(err => {
                swal.fire({
                    titleText: "Qualcosa è andato storto :-/",
                    text: "Aggiorna la pagina e riprova.",
                    icon: "error",
                    background: "#f2f6fa",
                    confirmButtonColor: '#0F6FFF'
                });
            });
    };

    const sellAsset = (id) => {

    };

    return (
        <div>
            <span className="titlepage">Compra o vendi asset</span>
            {printAssets()}
        </div>
    );
}