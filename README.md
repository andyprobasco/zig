#zig
##zombie incremental game

`ruby -r webrick -e "s = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd); trap('INT') { s.shutdown }; s.start"`


#TODO
##Game Components
###Controllers

##UI Components
-popup (battle)
-popup (tutorial)
-popup (information)

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
- 


Every X minutes, Z attack.
threat increases danger of attack.
defense score stops attack.



Timer - 
    attack gets closer to happening
    jobs get closer to being finished
    basic jobs add to threat rate/morale rate
    threat increases rate of Z growth
    morale attracts survivors


Absolute:
# place workers to do jobs
# manage food and water resrouces
# penalty for running out of food/water

running out of food/water kills morale
morale dropping loses dudes (as before)
morale and threat can go positive/negative


UI:
    attack meter
    threat meter
    morale meter

    resources
    regions
    subregions

    jobs

Controllers:
    job controller
        assign worker
        remove worker

        get text data.

    resource controller (read only)
        get current resources
        get max resources

    meter controller (read only)
        get current % progress

content.
how to unlock content.

#build models
#build views
    ##design views
        RegionMap
            Region
                SubregionMap

#build content
    ##design content



    Drag workers from job to job
        rest job
        scavenge job
        worker icon
        scrap meter
        threat counter
        morale counter
        panel

Mechanics = DONE.

UI design.
Content design.
Mechanics implementation!


UI COMPONENTS

    Horde Panel
        Threat Meter
        Attack Meter
    Survivor Panel
        Rest Job
            Morale Meter
        Neighborhood Panel
            Regions: Scout > Clear > Scavenge
        HQ Panel
            Facilities: Upgrade, On/Off
        Workshop Panel
            Traps: Build
            Upgrades: Research
    Resource Panel
        Resources
    Message/Info Panel
    Popup Panel.

The player starts with the Rest Job, the neighborhood with one unlocked location, and one survivor.

Morale is positive.
Threat is non-increasing.

Entity Tree

Job > Worker Pool
    > Facility
    > Region



GameService
    timers
LocationService
    Neighborhood
        regions
    HQ
        facilities
    *Workshop
        *upgrades
HordeService
ResourceService
    all resources including threat, morale, survivors, defense.
InfoService?
PopupService



Regions {
    state:
    scoutDifficulty: int
    dangerLevel: int
    threatModifier: int
    scavengeReward:[{weight:int, reward:function}] 
}


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

0.2 workshop
    Regions
        Garage > workbench
    Subregions
        workbench
    Upgrades
        Traps

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



