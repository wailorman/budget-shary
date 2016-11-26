#2.3.0-beta
* **Materialize interface** and other restylings
* Add PWA manifest.json
* (bug-fix) No more errors with creating new persons/products with existing ids ([3df9031](https://github.com/wailorman/budget-shary/commit/3df9031c8416254f0adc483c7c6adead235e17f9),
                                                                                 [3e0dd64](https://github.com/wailorman/budget-shary/commit/3e0dd64d9d17eabd0e21aab6b265c30485c95b70),
                                                                                 [9de30e5](https://github.com/wailorman/budget-shary/commit/9de30e57fecb14c4d3fd4b6aa3b5e10411f72694))
* (dev) Auto-deploy all travis builds to Selectel (see [77d3df2](https://github.com/wailorman/budget-shary/commit/77d3df25fa20978a7a23894abcc17101f1e03f72))
* (dev) Optimize rendering (More containers, better _shouldComponentUpdate()_)


#2.2.0-beta
* Bottom margin after participating buttons on phones ([8f33731](https://github.com/wailorman/budget-shary/commit/8f33731))
* **Multiple budgets**.<br/>
  Now you should not to erase previous budget to create a new one. You can just
  create new budget, keeping an old one. 
* (bug-fix) Calculating can't be proceeded if exists empty person with empty product(s) ([a98f518](https://github.com/wailorman/budget-shary/commit/a98f518))
* (bug-fix) productParticipating spamming into console ([7de8d33](https://github.com/wailorman/budget-shary/commit/7de8d33))
* Write little description about app interchanging algorithm ([bd6b6dc](https://github.com/wailorman/budget-shary/commit/bd6b6dc))
* (dev) Write good JSDocs for core functions ([15e3c06](https://github.com/wailorman/budget-shary/commit/15e3c06), 
                                              [dd66775](https://github.com/wailorman/budget-shary/commit/dd66775))

# 2.1.0-beta
* **Participating feature**.<br/> 
  Now you can just click on persons which are have share in particular product and 
  share will be calculated automatically
* (dev) Better, more predictable and simple algorithm of validation
* (dev) Interchange proceeding moved to own middleware
* (dev) Remove api code from repository. I'll create independent repository for api
* (dev) Reorganize npm scripts (read the [new README.md](https://github.com/wailorman/budget-shary/blob/110682e45078b4af56d58e06b7d83fa7dc832cad/README.md))