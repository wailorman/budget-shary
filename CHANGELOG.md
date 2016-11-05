#2.2.0-beta
* Bottom margin after participating buttons on phones (8f337311ff6c45691b41fdd47377d261052aa8c1)
* **Multiple budgets**.<br/>
  Now you should not to erase previous budget to create a new one. You can just
  create new budget, keeping an old one. 
* (bug-fix) Calculating can't be proceeded if exists empty person with empty product(s) (a98f51823c46e4470192f32e80ded6394b2e880b)
* (bug-fix) productParticipating spamming into console (7de8d335e94826b53faad39c4d39dae2172df9e6)
* Write little description about app interchanging algorithm (bd6b6dc99a537be766d9de13a04cddf4b7584285)
* (dev) Write good JSDocs for core functions (15e3c06bafacef0cb7d80146aec26fd0fed7f95c, 
                                              dd66775c25196c7a7f94eebad9b7a4a20fbd0495)

# 2.1.0-beta
* **Participating feature**.<br/> 
  Now you can just click on persons which are have share in particular product and 
  share will be calculated automatically
* (dev) Better, more predictable and simple algorithm of validation
* (dev) Interchange proceeding moved to own middleware
* (dev) Remove api code from repository. I'll create independent repository for api
* (dev) Reorganize npm scripts (read the [new README.md](https://github.com/wailorman/budget-shary/blob/110682e45078b4af56d58e06b7d83fa7dc832cad/README.md))