class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
class Triangle{
    constructor(a, b, c){
        this.a = a;
        this.b = b;
        this.c = c;
    }
    area(){
        this.S = Math.abs(((this.b.x - this.a.x) * (this.c.y - this.a.y) - (this.b.y - this.a.y) * (this.c.x - this.a.x)) / 2);
        return this.S;
    }
    circumcircleContains(d){
        const ax = this.a.x - d.x; const ay = this.a.y - d.y;
        const bx = this.b.x - d.x; const by = this.b.y - d.y;
        const cx = this.c.x - d.x; const cy = this.c.y - d.y;
        let det = ax * (by * (cx*cx + cy*cy) - cy * (bx*bx + by*by)) - ay * (bx * (cx*cx + cy*cy) - cx * (bx*bx + by*by)) + (ax*ax+ay*ay) * (bx*cy - by*cx);
        const cross = ((this.b.x - this.a.x) * (this.c.y - this.a.y) - (this.b.y - this.a.y) * (this.c.x - this.a.x)) / 2;
        if(cross < 0)
            det = -1 * det;
        if(det >= 0)
            return true;
        else 
            return false;
    }
}
const t = new Triangle({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 });
console.log(t.area());  // 6
console.log(t.circumcircleContains({ x: 2, y: 1 }));  // true 
console.log(t.circumcircleContains({ x: 10, y: 10 })); // false 
const t2 = new Triangle({ x: 0, y: 0 }, { x: 0, y: 3 }, { x: 4, y: 0 });
console.log(t2.circumcircleContains({ x: 2, y: 1 }));  // true