export const receipt = ({ settings, order, date, subTotal, totalVat, totalTurni3, orderTotal, orderNumber, user }) => `<div style="font-size: 10px;">                            
<p style="text-align: center;">
    <span style="font-size: 22px;">${settings.store}</span> <br>
    ${settings.address_one} <br>
    ${settings.contact != '' ? 'Tel: ' + settings.contact + '<br>' : ''} 
</p>
<hr>
<left>
    <p>
    Order No : ${orderNumber} <br>
    Cashier : ${user} <br>
    Date : ${date}<br>
    </p>

</left>
<hr>
<table width="100%">
    <thead style="text-align: left;">
    <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
    </tr>
    </thead>
    <tbody>
    ${order.map(item => "<tr><td>" + (item.name || item.product_name) + "</td><td>" + item.quantity + "</td><td>" + settings.symbol + parseFloat(item.price).toFixed(2) + "</td></tr>").join('')}
<tr>
    <td><b>Nentotali</b></td>
    <td>:</td>
    <td><b>${settings.symbol}${subTotal.toFixed(2)}</b></td>
</tr>
    ${settings.applyPercentage ? `<tr>
    <td>TVSH(${settings.percentage})% </td>
    <td>:</td>
    <td>${settings.symbol}${parseFloat(totalVat).toFixed(2)}</td>
</tr>`: ''
    }
${settings.nightShift ? `<tr>
<td>TURNI 3(${settings.nightShiftMethod === 'fixedPrice' ? `${settings.symbol}${settings.valueFixed}` : `${settings.valuePecentage}%`}) </td>
        <td>:</td>
            <td>${settings.symbol}${parseFloat(totalTurni3).toFixed(2)}</td>
</tr > `: ''
    }
<tr>
    <td><h3>Total</h3></td>
    <td><h3>:</h3></td>
    <td>
        <h3>${settings.symbol}${parseFloat(orderTotal).toFixed(2)}</h3>
    </td>
</tr>
    </tbody >
    </table >
    <br>
        <hr>
            <br>
                <p style="text-align: center;">
                    ${settings.footer}
                </p>
            </div>`;