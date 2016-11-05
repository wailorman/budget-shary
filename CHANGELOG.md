#2.2.0-beta
* Bottom margin after participating buttons on phones (8f33731)
* **Multiple budgets**.<br/>
  Now you should not to erase previous budget to create a new one. You can just
  create new budget, keeping an old one. 
* (bug-fix) Calculating can't be proceeded if exists empty person with empty product(s) (a98f518)
* (bug-fix) productParticipating spamming into console (7de8d33)
* Write little description about app interchanging algorithm (bd6b6dc)
* (dev) Write good JSDocs for core functions (15e3c06, dd66775)

# 2.1.0-beta
* **Participating feature**.<br/> 
  Now you can just click on persons which are have share in particular product and 
  share will be calculated automatically
* (dev) Better, more predictable and simple algorithm of validation
* (dev) Interchange proceeding moved to own middleware
* (dev) Remove api code from repository. I'll create independent repository for api
* (dev) Reorganize npm scripts (read the [new README.md](https://github.com/wailorman/budget-shary/blob/110682e45078b4af56d58e06b7d83fa7dc832cad/README.md))