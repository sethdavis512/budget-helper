import { getUniqueId } from './utilFunctions';

export const mockTransactions = [
    {
        Details: 'CREDIT',
        'Posting Date': '03/01/2021',
        Description:
            'VENMO            CASHOUT                    PPD ID: 5264681992',
        Amount: 46,
        Type: 'ACH_CREDIT',
        Balance: 10006.27,
        'Check or Slip #': null,
        '': null,
        id: '4kx7k5ppk'
    },
    {
        Details: 'DSLIP',
        'Posting Date': '03/01/2021',
        Description: 'REMOTE ONLINE DEPOSIT #          1',
        Amount: 40.65,
        Type: 'CHECK_DEPOSIT',
        Balance: 9960.27,
        'Check or Slip #': 1,
        '': null,
        id: '16lwaii6s'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/01/2021',
        Description: 'Spotify USA 877-7781161 NY                   02/27',
        Amount: 10.81,
        Type: 'DEBIT_CARD',
        Balance: 9919.62,
        'Check or Slip #': null,
        '': null,
        id: 'pwh6qpf9t'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/01/2021',
        Description: 'APPLE.COM/BILL 866-712-7753 CA               02/27',
        Amount: -0.99,
        Type: 'DEBIT_CARD',
        Balance: 9934.39,
        'Check or Slip #': null,
        '': null,
        id: 'h7w32jhjn'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/03/2021',
        Description: 'APPLE.COM/BILL 866-712-7753 CA               03/02',
        Amount: -2.99,
        Type: 'DEBIT_CARD',
        Balance: 9337.39,
        'Check or Slip #': null,
        '': null,
        id: 'a92lzprmb'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/02/2021',
        Description: 'DisneyPLUS 888-9057888 CA                    03/01',
        Amount: -6.5,
        Type: 'DEBIT_CARD',
        Balance: 9417.39,
        'Check or Slip #': null,
        '': null,
        id: 'etdjbm333'
    },
    {
        Details: 'CREDIT',
        'Posting Date': '03/01/2021',
        Description:
            'VENMO            CASHOUT                    PPD ID: 5264681992',
        Amount: 46,
        Type: 'ACH_CREDIT',
        Balance: 10006.27,
        'Check or Slip #': null,
        '': null,
        id: 'yzxcfu0su'
    },
    {
        Details: 'DSLIP',
        'Posting Date': '03/01/2021',
        Description: 'REMOTE ONLINE DEPOSIT #          1',
        Amount: 40.65,
        Type: 'CHECK_DEPOSIT',
        Balance: 9960.27,
        'Check or Slip #': 1,
        '': null,
        id: 'n4guhfjjj'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/01/2021',
        Description: 'Spotify USA 877-7781161 NY                   02/27',
        Amount: 10.81,
        Type: 'DEBIT_CARD',
        Balance: 9919.62,
        'Check or Slip #': null,
        '': null,
        id: 'bhpqck4im'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/01/2021',
        Description: 'APPLE.COM/BILL 866-712-7753 CA               02/27',
        Amount: -0.99,
        Type: 'DEBIT_CARD',
        Balance: 9934.39,
        'Check or Slip #': null,
        '': null,
        id: 'ldjecby0m'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/03/2021',
        Description: 'APPLE.COM/BILL 866-712-7753 CA               03/02',
        Amount: -2.99,
        Type: 'DEBIT_CARD',
        Balance: 9337.39,
        'Check or Slip #': null,
        '': null,
        id: '6quejw9r0'
    },
    {
        Details: 'DEBIT',
        'Posting Date': '03/02/2021',
        Description: 'DisneyPLUS 888-9057888 CA                    03/01',
        Amount: -6.5,
        Type: 'DEBIT_CARD',
        Balance: 9417.39,
        'Check or Slip #': null,
        '': null,
        id: '5rieg64lh'
    }
];

export const mockBudgets = [
    {
        id: getUniqueId(''),
        name: 'Home',
        transactions: [mockTransactions[0], mockTransactions[2]]
    },
    {
        id: getUniqueId(''),
        name: 'Utilities',
        transactions: []
    },
    {
        id: getUniqueId(''),
        name: 'Savings',
        transactions: []
    }
];

export const mockDocumentData = [
    {
        data: [
            {
                Details: 'CREDIT',
                'Posting Date': '03/01/2021',
                Description:
                    'VENMO            CASHOUT                    PPD ID: 5264681992',
                Amount: 46,
                Type: 'ACH_CREDIT',
                Balance: 10006.27,
                'Check or Slip #': null,
                '': null,
                id: '0w1s87jf4'
            },
            {
                Details: 'DSLIP',
                'Posting Date': '03/01/2021',
                Description: 'REMOTE ONLINE DEPOSIT #          1',
                Amount: 40.65,
                Type: 'CHECK_DEPOSIT',
                Balance: 9960.27,
                'Check or Slip #': 1,
                '': null,
                id: 'gkp8q34e0'
            },
            {
                Details: 'DEBIT',
                'Posting Date': '03/01/2021',
                Description:
                    'Spotify USA 877-7781161 NY                   02/27',
                Amount: 10.81,
                Type: 'DEBIT_CARD',
                Balance: 9919.62,
                'Check or Slip #': null,
                '': null,
                id: '8hpbbff2c'
            },
            {
                Details: 'DEBIT',
                'Posting Date': '03/01/2021',
                Description:
                    'APPLE.COM/BILL 866-712-7753 CA               02/27',
                Amount: -0.99,
                Type: 'DEBIT_CARD',
                Balance: 9934.39,
                'Check or Slip #': null,
                '': null,
                id: 't8m1xsizo'
            },
            {
                Details: 'DEBIT',
                'Posting Date': '03/03/2021',
                Description:
                    'APPLE.COM/BILL 866-712-7753 CA               03/02',
                Amount: -2.99,
                Type: 'DEBIT_CARD',
                Balance: 9337.39,
                'Check or Slip #': null,
                '': null,
                id: 'a7klfq02e'
            },
            {
                Details: 'DEBIT',
                'Posting Date': '03/02/2021',
                Description:
                    'DisneyPLUS 888-9057888 CA                    03/01',
                Amount: -6.5,
                Type: 'DEBIT_CARD',
                Balance: 9417.39,
                'Check or Slip #': null,
                '': null,
                id: '8sr3jv0mt'
            }
        ],
        errors: [],
        meta: {
            delimiter: ',',
            linebreak: '\r\n',
            aborted: false,
            truncated: false,
            cursor: 647,
            fields: [
                'Details',
                'Posting Date',
                'Description',
                'Amount',
                'Type',
                'Balance',
                'Check or Slip #',
                ''
            ]
        }
    }
];

export const mockFilePaths = [
    '/Users/seth/Downloads/test-1.csv',
    '/Users/seth/Downloads/test-2.csv'
];
