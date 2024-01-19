let init = true;
export default function Logical () {
    let keys;
    let KeyDown = false;
    let Register_keys = {
        up: false,
        down: false,
        left: false,
        right: false,
    }
    let player = {
        point: {x:0, y:0},
        size: {width: 100, height: 100},
        speed: 5,
        image: null,
        keys: {...Register_keys},
    };

    let Disabled = {
        HIGH:{...Register_keys},
        LOW:{...Register_keys}
    }
    
    function For_Keys(e, status) {for (const key in player.keys) {if (e.keyCode == keys[key]) {player.keys[key] = status;}}}
    this.keydown = (e) => {KeyDown=true; For_Keys(e, true);};
    this.keyup = (e) => {KeyDown=false; For_Keys(e, false);};

    this.void=({ graph, scripts, vars })=>{
        vars.logic = {}
        player.image = vars.resources.player.down[0];
        vars.logic.player = player;
        vars.logic.Disabled = Disabled;
        keys = vars.resources.keys;
        return { graph, scripts, vars};
    };

    let animate = 0;
    let Time_animate = {limit:5, count:10};
    let Time_stop = {limit:5, count:0};
    let Orientation = null;
    this.loop = ({ graph, scripts, vars })=>{
        player = vars.logic.player;
        Disabled = vars.logic.Disabled;

        if (!Time_animate.cache) {Time_animate.cache = Time_animate.limit}
        if (!Time_stop.cache) {Time_stop.cache = Time_stop.limit}

        if (KeyDown) {
            if (Time_animate.count >= Time_animate.limit) {
                Time_animate.count = 0;
                animate = (animate + 1) %4;
            }else{Time_animate.count++;}
        }else{
            if (Time_stop.count >= Time_stop.limit) {
                Time_stop.count = 0;
                animate = 0;
                Time_animate.count = Time_animate.cache;
                if(Orientation !=null){
                    player.image = vars.resources.player[Orientation][animate];
                }
            }else{Time_stop.count++;}
        }

        let ActiveMove = false;
        if (player.keys.up && !Disabled.HIGH.up && !Disabled.LOW.up) {
            Orientation = "up";
            player.point.y -= player.speed;
            ActiveMove = true;
        }
        if (player.keys.down && !Disabled.HIGH.down && !Disabled.LOW.down) {
            Orientation = "down";
            player.point.y += player.speed;
            ActiveMove = true;
        }
        if (player.keys.left && !Disabled.HIGH.left && !Disabled.LOW.left) {
            Orientation = "left";
            player.point.x -= player.speed;
            ActiveMove = true;
        }
        if (player.keys.right && !Disabled.HIGH.right && !Disabled.LOW.right) {
            Orientation = "right";
            player.point.x += player.speed;
            ActiveMove = true;
        }

        if (ActiveMove!=false) {
            player.image = vars.resources.player[Orientation][animate];
        }
        vars.logic.Disabled = Disabled;        
        vars.logic.player = player;
        return { graph, scripts, vars};
    }


}