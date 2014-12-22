#zig
##zombie incremental game

`ruby -r webrick -e "s = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd); trap('INT') { s.shutdown }; s.start"`


#TODO

2 info panel
3 tooltips

5 resource meters
6 icons

* "Disabled" job state
* Max Workers


##UI Components
-popup (battle)
-popup (tutorial)
-popup (information)
-popup (on region or subregion unlock)



##mechanical walkthrough
- battle popup (dead!)
- unlock:
    + "Rest" job
    + region map
- explore new region
    + drag worker onto region, wait for timer
    + popup window or information display when when work is complete
- clear region 
    + drag worker onto region, wait for timer
    + display when work is complete
- unlock:
    + subregion map
    + "Scavenge" job ("workshop/patrol" remaining)
- repair old subregions OR explore new region OR build up supplies

with Beds AND high morale get new WORKER
- explore new region
- unlock workshop




Timer - 
    attack gets closer to happening
    jobs get closer to being finished
    basic jobs add to threat rate/morale rate
    threat increases rate of Z growth
    morale attracts survivors



#Content.

Regions:
    Compound

Regions:
    HQ
    House
    Farmhouse
    Warehouse
    Church
    Garage
    Police Station/Gun Store
    Cinema/Club/Restaurant/Hotel
    Clinic
    junkyard

    MultiTile?
        Mall
        Stadium
        Jail
        Zoo
        Fort
        Hospital

Subregions:
    workbench
    engineering bench
    weapons bench?
    gear bench?
    medical bench?
    construction yard
    radio receiver
    radio tower
    windmill
    generator
    training center
    resource storage
    resource production
    barricade
    beds
    shower
    outhouse
    kitchen
    washing station
    Parking Area/Garage
    Watch Tower

Upgrades:


0.1 alpha
    Regions
        Compound
        Warehouse > generic scavenge
    Subregions
        Resource Facilities
            Vegetable Garden
            Water Collector
            Food Storage
            Water Storage
            Beds
            Scrap Storage
        Barricade
        Watchtower

0.15
    unlock buildings via scavenge finds

0.2 workshop
    Regions
        Garage > workbench
    Subregions
        workbench
    Upgrades
        Traps

0.25 scavenge pack
    make scavenging worse over time.

0.3 power
    Regions
        Gas Station > gas
    Subregions
        generator
        windmill
        purifier > powered water
        sunlamps > powered food
        electric fence > powered defense
        power tools > powered workshop





The only action a player has access to is moving workers.
- each job only has one result?
- upgrade building vs work at building.


----------------------
|      Resources     |
----------------------
|       Threat       |
----------------------
|       Morale       |
----------------------
| tab    tab     tab |
|                    |
|       JOBS         |
|                    |
----------------------
|       info         |
----------------------


