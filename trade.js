rows = []
data.results.forEach(result => {
    if (/^order$/g.test(result.object)) {  
        transaction = []
        transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(result.filled_at)))
        transaction.push('BUY')
        transaction.push(result.symbol)
        transaction.push(result.fill_quantity)
        transaction.push(`-${result.account_value.amount}`);
        rows.push(transaction);
    } else if (/^dividend$/g.test(result.object)) {  
        transaction = []
        transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(result.effective_date + ' GMT-0500')));
        transaction.push('DIV')
        transaction.push(result.symbol)
        transaction.push(null)
        transaction.push(result.net_cash.amount);
        rows.push(transaction);
    } else if (/^deposit$/g.test(result.object)) {  
        transaction = []
        transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(result.updated_at)));
        transaction.push('DEP')
        transaction.push(null)
        transaction.push(null)
        transaction.push(result.value.amount);
        rows.push(transaction);
    }
})
output = rows.map(row => {
    return row.join()
}).join("\r\n")
console.log(output)