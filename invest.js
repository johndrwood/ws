rows = []
data.items.forEach((item) => {
    item.activities.forEach((activity) => {
        if (/^Dividends? received$/g.test(activity.title)) {       
            activity.formatted_details.forEach((formatted_detail) => {
                transaction = [];
                transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
                transaction.push('DIV');
                transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                transaction.push(null);
                transaction.push(formatted_detail.amount);
                rows.push(transaction);
            });
        } else if (/^(Funds invested|Invested cash).*$/g.test(activity.title)) {
            activity.formatted_details.forEach((formatted_detail) => {
                transaction = [];
                transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
                if (formatted_detail.sentence.startsWith('Sold')) {
                    transaction.push('SELL');
                    transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                    transaction.push('-' + formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                    transaction.push(formatted_detail.formatted_amount.replace(/\-\$|,/g,''));
                } else {
                    transaction.push('BUY');
                    transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                    transaction.push(formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                    transaction.push(formatted_detail.formatted_amount.replace('$','-').replace(',',''));
                }
                rows.push(transaction);
            });
        } else if (/^(Assets sold|Sold assets to increase the cash balance|Sold assets for transfer)$/g.test(activity.title)) {
            activity.formatted_details.forEach((formatted_detail) => {
                transaction = [];
                transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
                transaction.push('SELL');
                transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                transaction.push('-' + formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                transaction.push(formatted_detail.formatted_amount.replace(/\$|,/g,''));
                rows.push(transaction);
            });
        } else if (/^Rebalanced.*$/g.test(activity.title)) {
            activity.formatted_details.forEach((formatted_detail) => {
                transaction = [];
                transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
                if (formatted_detail.sentence.startsWith('Sold')) {
                    transaction.push('SELL');
                    transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                    transaction.push('-' + formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                    transaction.push(formatted_detail.formatted_amount.replace(/\-\$|,/g,''));
                } else {
                    transaction.push('BUY');
                    transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                    transaction.push(formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                    transaction.push(formatted_detail.formatted_amount.replace('$','-').replace(',',''));
                }
                rows.push(transaction);
            });
        }  else if (/^Tax loss harvested to help reduce your next tax bill$/g.test(activity.title)) {
            activity.formatted_details.forEach((formatted_detail) => {
                transaction = [];
                transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
                if (formatted_detail.sentence.startsWith('Sold')) {
                    transaction.push('SELL');
                    transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                    transaction.push('-' + formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                    transaction.push(formatted_detail.formatted_amount.replace(/\-\$|,/g,''));
                } else {
                    transaction.push('BUY');
                    transaction.push(formatted_detail.sentence.split('<b>').pop().split('</b>')[0]);
                    transaction.push(formatted_detail.sentence.split('(').pop().split(' shares')[0]);
                    transaction.push(formatted_detail.formatted_amount.replace('$','-').replace(',',''));
                }
                rows.push(transaction);
            });
        } else if (/^Fees? paid$/g.test(activity.title)) {
            transaction = [];
            transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
            transaction.push('FEE');
            transaction.push(null);
            transaction.push(null);
            transaction.push(activity.amount.replace('$',''));
            rows.push(transaction);
        } else if (/^Non-resident tax charged$/g.test(activity.title)) {
            transaction = [];
            transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
            transaction.push('With. tax');
            transaction.push(null);
            transaction.push(null);
            transaction.push(activity.amount.replace('$',''));
            rows.push(transaction);
        // } else if (/^Contributions received$/g.test(activity.title)) {
        //     activity.details.forEach((detail) => {
        //         transaction = [];
        //         transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
        //         transaction.push('DEP');
        //         transaction.push(null);
        //         transaction.push(null);
        //         transaction.push(detail.replace(/\$|,/g,''));
        //         rows.push(transaction);
        //     });
        } else if (/^(Contributions? received|Deposit received).*$/g.test(activity.title)) {
            transaction = [];
            transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
            transaction.push('DEP');
            transaction.push(null);
            transaction.push(null);
            transaction.push(activity.amount.replace(/\$|,/g,''));
            rows.push(transaction);
        } else if (/^(Reimbursement).*$/g.test(activity.title)) {
            transaction = [];
            transaction.push(new Intl.DateTimeFormat('en-US',{day:'numeric',month:'numeric',year:'2-digit'}).format(new Date(item.iso_date + ' GMT-0500')));
            transaction.push('Reimburse');
            transaction.push(null);
            transaction.push(null);
            transaction.push(activity.amount.replace(/\$|,/g,''));
            rows.push(transaction);
        }
    });
});
output = rows.map((row) => {
    return row.join();
}).join("\r\n");
console.log(output);
