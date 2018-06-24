## Bootstrapping Order

0.

Install Docker for Windows (with Kubernetes support, maybe edge) / Docker for Mac
Have docker in $PATH

git clone git@github.com:jvanoers/autonomous.git

cd autonomous 

yarn

./bootstrap/buildPackage.sh relayer 0.1
./bootstrap/buildPackage.sh dapp 0.1

cd packages/colony

yarn ipfs:start
..
yarn ganache:start
..
yarn truffle:compile
..
cp .env.example .env
vi .env  # example config should suffice 
yarn contracts:serve
...
yarn cli migrate

cd ../dapp
cp .env.example .env
vi .env # example config should suffice
yarn start

cd ../relayer
cp .env.example .env
vi .env # example config should suffice
yarn start
# No errors means good config!

------
Test Colony:

1. Make colony:

cd packages/Colony
yarn cli add
--> Note down the address (0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA)
---> CTRL+C out

Enter in "Register" field
---> 0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA
Click create deployment
-- Enter brief
-- Use your current address (any)
--> Create Task

--> Submit txs that metamask prompts

Browser: go to localhost:5555 << this is to prove nothing is running

Submit work:
--> ~/bootstrap/deployments/examples/nginx.json
COPY
PASTE

Submit
Approve metamask txs
---
deployment
approve txs
---

Deployment logs
--> Refresh log

Browser: localhost:5555 << NGINX starts!

----------
Click clean all
confirm localhost:5555 is offline now
----------

Bootstrapping:
----- New Colony
~/pakcages/colony
yarn cli add
--- Note down address (0x44F44C1dEFf80a3E94B96E872233fcB63e425438)
--- CTRL+C


Go to colony
----
Register the colony
0x44F44C1dEFf80a3E94B96E872233fcB63e425438
---
Create deployment
add name, people, Submit
metamask approve txs

Submit work:
:: copy 
~/bootstrap/deployments/combined.json
PASTE
Submit
metamask approve txs

--- Deployment
deployment
approve txs

-----

WAIT

GO TO localhost:9999

------

Note top left: Kubernetes edition.

---
TURN OFF relayer

TURN OFF DAPP

--- 

localhost:9999

Register test Colony
0x4479B49eE193E6107Ed2Ad38A9b089Ee362542BA

REPEAT TEST COLONY PROCEDURE

---- Confirm localhost:5555 shows the nginx

------

BOOTSTRAP 

Confirm relayer address:
localhost:8888/hello (relayer exposed port)

Go to autonomous colony
(Login, not register)
0x44F44C1dEFf80a3E94B96E872233fcB63e425438

-- 
NEw task (new autonomous version from bootstrapped environment)
approve txs

submit work
----- GO TO COMBINED.json again

BUT-----

line 119: version: 0.1 ---> 0.2 (an upgrade)

submit it as work to new task

deploy

----

WAIT

--- go to localhost:8888

REFRESH: "Hello world!"

---

Deployment logs -> refresh log!
