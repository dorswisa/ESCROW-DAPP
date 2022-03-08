"strict mode"
const address ='0x953D379843Ec465104AC707206eEcd883E9d0253';

const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "notification",
                "type": "string"
            }
        ],
        "name": "notify",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "b_delivery_received",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "buyerOK",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "buyers",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_seller",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "init_escrow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "isBuyer",
        "outputs": [
            {
                "internalType": "int256",
                "name": "",
                "type": "int256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "isSeller",
        "outputs": [
            {
                "internalType": "int256",
                "name": "",
                "type": "int256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "items",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "itemsprices",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "n_escrows",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "sellerOK",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "seller_deny_service",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "seller_send_product",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "sellers",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "states",
        "outputs": [
            {
                "internalType": "enum Escrow.state",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

document.addEventListener("DOMContentLoaded", function(event) {

    if (window.ethereum)
    {

        ethereum.on("chainChanged", () => window.location.reload());

        ethereum.on("connect", (info) => {
            fillDetails();
            console.log(`Connected to network ${parseInt(info.chainId, 16)}`);
        });

        ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                fillDetails();
            } else {
                console.error("0 accounts.");
            }
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(address, abi, signer);

        document.getElementById("initBtn").addEventListener("click", function () {
            var price = document.getElementById("Price").value;
            var product = document.getElementById("Product").value;
            var sellerAddress = document.getElementById("SellerAddress").value;
            if (price != "" && product != "" && sellerAddress != "") {
                contract.init_escrow(sellerAddress,product,price)
                    .then((tx) => {
                        console.log("Transaction occured: ", tx);
                        return tx.wait().then((result) => {alert(result.events[0].args[0])
                            setTimeout(window.location.reload(), 2000);
                        }).catch((err) => alert(err.data.message));
                    })
                    .catch((err) => alert(err.data.message));
            } else {
                alert("Please fill in all fields before click on init escrow.");
            }
        });

        async function getDetails() {
            let n = parseInt(await contract.n_escrows(),16);
            let buyers = [];
            let sellers = [];
            let states = [];
            let prices = [];
            let sellerOK = [];
            let buyerOK = [];
            for (var i = 0; i < n; i++) {
                buyers.push(await contract.buyers(i));
                sellers.push(await contract.sellers(i));
                states.push(await contract.states(i));
                prices.push(await contract.itemsprices(i));
                sellerOK.push(await contract.sellerOK(i));
                buyerOK.push(await contract.buyerOK(i));
            }
            return buyers.map((buyer, index) => {
                return {
                    'buyer': buyer,
                    'seller': sellers[index],
                    'state': states[index],
                    'price': prices[index],
                    'sellerOK': sellerOK[index],
                    'buyerOK': buyerOK[index],
                };
            });
        }

        async function fillDetails() {
            var currentAcc;

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAcc = accounts[0];
            data = await getDetails();

            var table = document.getElementById("table");
            var rowCount = table.rows.length;
            for (var i = 1; i < rowCount; i++) {
                table.deleteRow(1);
            }
            data.forEach((row, index) => {
                var tableRow = table.insertRow(index+1);
                tableRow.insertCell(0).innerHTML = row.buyer;
                tableRow.insertCell(1).innerHTML = row.seller;
                tableRow.insertCell(2).innerHTML = row.price;
                tableRow.insertCell(3).innerHTML = row.state == 0 ? "AWAITING BUYER PAYMENT" : row.state == 1 ? "AWAITING DELIVERY" : "COMPLETE";
                tableRow.children[3].style.color = row.state == 0 ? "orange" : row.state == 1 ? "orange" : "lightgreen";

                if(currentAcc.toLowerCase() == row.buyer.toLowerCase())
                {
                    if(row.state == 0)
                    {
                        console.log(currentAcc);
                        tableRow.insertCell(4).innerHTML = `<button onclick='Pay("` + currentAcc + `",` + row.price + `)'>Pay</button><button onclick='' disabled>Item Received</button>`;
                    }
                    else if(row.state == 1)
                    {
                        tableRow.insertCell(4).innerHTML = `<button onclick='' disabled>Pay</button><button onclick='itemRecived()'>Item Received</button>`;
                    }
                    else
                    {
                        tableRow.insertCell(4).innerHTML = `<button onclick='' disabled>Pay</button><button onclick='' disabled>Item Received</button>`;
                    }
                }
                else if(currentAcc.toLowerCase() == row.seller.toLowerCase())
                {
                    if(row.state == 1 && !row.sellerOK)
                    {
                        tableRow.insertCell(4).innerHTML = `<button onclick='itemSent()'>Item Sent</button><button onclick='sellerDenied()'>Denied Ecsrow</button>`;
                    }
                    else
                    {
                        tableRow.insertCell(4).innerHTML = `<button onclick='' disabled>Item Sent</button><button onclick='' disabled>Denied Ecsrow</button>`;
                    }
                }
            });
        }
    } else {
        console.error("Install MetaMask.");
    }

});

async function Pay(currentAddress,amount) {
    const transactionParameters = {
        to: address,
        from: currentAddress, // must match user's active address.
        value: ethers.utils.parseUnits(amount.toString(), 'wei').toHexString(), // Only required to send ether to the recipient from the initiating external account.
    };

// txHash is a hex string
// As with any RPC call, it may throw an error
    const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
}

function itemSent() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    contract.seller_send_product()
        .then((tx) => {
            console.log("Transaction occured: ", tx);
            return tx.wait().then((result) => {alert(result.events[0].args[0])
                setTimeout(window.location.reload(), 2000);
            }).catch((err) => alert(err.data.message));
        })
        .catch((err) => alert(err.data.message));
}

function sellerDenied() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    contract.seller_deny_service()
        .then((tx) => {
            console.log("Transaction occured: ", tx);
            return tx.wait().then((result) => {alert(result.events[0].args[0])
                setTimeout(window.location.reload(), 2000);
            }).catch((err) => alert(err.data.message));
        })
        .catch((err) => alert(err.data.message));
}
function itemRecived() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    contract.b_delivery_received()
        .then((tx) => {
            console.log("Transaction occured: ", tx);
            return tx.wait().then((result) => {alert(result.events[0].args[0])
                setTimeout(window.location.reload(), 2000);
            }).catch((err) => alert(err.data.message));
        })
        .catch((err) => alert(err.data.message));
}