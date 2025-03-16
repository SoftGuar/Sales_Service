const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_dUD6pIEd7VcwBKC3nwa",
    host: "irchad-irchad.e.aivencloud.com",
    port: 15147,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUTwHfFtILn0H3ytUp9FxqtDYKW4EwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1MmMyZmI2ODMtYTZjZC00NDkzLWJmY2YtMGUwZGViYWVm
NjhjIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwMzA4MTcyOTIyWhcNMzUwMzA2MTcy
OTIyWjBAMT4wPAYDVQQDDDUyYzJmYjY4My1hNmNkLTQ0OTMtYmZjZi0wZTBkZWJh
ZWY2OGMgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAL0n8rOUwy4MDe/tPk33RXx4W2BviMdAZ/O4ZzEicPH/AKw6bAKP4iT8
arvGZDj9J1DEJxRvCraqV6B4/3Cfr/i5bOIjP4HhRMuU6O6UO+9A4eOcaxbawiOz
0pk0l+Sd1hNBiNv8OV2ObHNJKR59x+URVKQQCJNMkO5daDeAQwaAATgHaqcklUIU
bVXWsGM2X2aiirPwT7MEB2aAoISjPxNVaTENEVKqzcO2JuxShvFATFdwEbSIajBF
j2wiH3nXACoHbYg7e/lG9i99wM0Fua3DHQcApADms5t8/KiijKeKT/uzyTHW3B8o
fkHDcGhIJcDw6kCA/+m4dGHaXNhYA+LJj0vXBktbRlsxIN6/paNxTAW8Fphmh08m
piISa/ZT6229GCK7IUQHqq9hRSbdkJCK6XKvjfZbc/v1lTdF9bVpiaCihBoTtmRa
ECCN8Ta89EZHGyL5Qd90iztftLI+GIzUXmKRSmUIp/gaYyDet7+7QA5s3UhqyzbL
RN/P/spnWQIDAQABoz8wPTAdBgNVHQ4EFgQU12HfZ77Yst8qw2hlgfP9WUAE2Tww
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AIXGr4gbLgr1476LOLdON4oxKsrMdyDP4/Z9nxz5etLuMCIb/oItnaGs/0H+zIOA
/Zndincb5POjzxqmM+1dfOipBz+I9N/NGZks7SltVi7XYQzc3C9xRI3/h+KUt5Jx
7ieEZkk2AL8k3KiPfV+9aoqOpNPyQ3x8oTSXp14sJRG8JT3aZSYXK7TUKq44eF76
71c62Aau8r5jpBqEF37DkUwB/x5rFQAROVIcVsNduenn1CNMzGBLhupePXNIvr79
10wzgWzD4wNW2EFV5eDl5or+Jm69U1OEL5TPm4nFAi10O80aKvhjN0X7vqmiAlN8
G6NxkbToqA0NV8syP/57gXUZV8y/yk9lV1LQW7RxxlOrIAixDqRHRUuO/xgNpWtN
y1jPmAFiX1oQw+EpfMXlVfMMiJA1/QKMuS0z3i5ox/T0RIXGaZXbgxUpRgHtRSQL
oujQLiFgwb1BpiHmdvoEDFu5c6QLLzcyMtufh43KWyT2ycfvHQ71Nmm6WtBG9Qb3
Eg==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});