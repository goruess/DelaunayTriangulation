const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function drawPoint(ctx, point, color, radius) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);  
  ctx.fillStyle = color;
  ctx.fill();
}
function drawTriangle(ctx, a, b, c, color){
  ctx.beginPath();          
  ctx.moveTo(a.x, a.y);      
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.closePath();      
  ctx.strokeStyle = color;
  ctx.stroke();   
}
function circumcircle(a, b, c){
  const D = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  const centerX = ((a.x*a.x + a.y*a.y) * (b.y - c.y) + (b.x*b.x + b.y*b.y) * (c.y - a.y) + (c.x*c.x + c.y*c.y) * (a.y - b.y)) / D;
  const centerY = ((a.x*a.x + a.y*a.y) * (c.x - b.x) + (b.x*b.x + b.y*b.y) * (a.x - c.x) + (c.x*c.x + c.y*c.y) * (b.x - a.x)) / D;
  const rRadius = Math.sqrt((a.x-centerX)*(a.x-centerX) + (a.y-centerY)*(a.y-centerY));
  return {x: centerX, y: centerY, radius: rRadius};
}
function drawCircle(ctx, cx, cy, radius, color){
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);  
  ctx.strokeStyle = color;
  ctx.stroke();
}
function checkIfContains(triangle, d){
  const ax = triangle[0].x - d.x; const ay = triangle[0].y - d.y;
  const bx = triangle[1].x - d.x; const by = triangle[1].y - d.y;
  const cx = triangle[2].x - d.x; const cy = triangle[2].y - d.y;
  let det = ax * (by * (cx*cx + cy*cy) - cy * (bx*bx + by*by)) - ay * (bx * (cx*cx + cy*cy) - cx * (bx*bx + by*by)) + (ax*ax+ay*ay) * (bx*cy - by*cx);
  const cross = ((triangle[1].x - triangle[0].x) * (triangle[2].y - triangle[0].y) - (triangle[1].y - triangle[0].y) * (triangle[2].x - triangle[0].x)) / 2;
  if(cross < 0)
    det = -1 * det;
  if(det >= 0)
    return true;
  else 
    return false;
}
function getTriangleSide(point1, point2){
    return [{x: point1.x, y: point1.y}, {x: point2.x, y: point2.y}];

}
function checkIfSameLine(line1, line2){
    if( (line1[0].x === line2[0].x && line1[0].y === line2[0].y) || (line1[0].x === line2[1].x && line1[0].y === line2[1].y) ){
        if( (line1[1].x === line2[0].x && line1[1].y === line2[0].y) || (line1[1].x === line2[1].x && line1[1].y === line2[1].y) ){
            return true;   
        }
        else
            return false;
    }
    else
        return false;
}
function triangulate(pointt){
  const starting_point1 = {x: -1000, y: -1000};
  const starting_point2 = {x: 2000, y: -1000};
  const starting_point3 = {x: 400, y: 2000};
  // const points = [starting_point1, starting_point2, starting_point3];
  // const triangles = [ {a: starting_point1, b: starting_point2, c: starting_point3, isValid: true} ];
  let triangles = [];
  triangles.push([starting_point1, starting_point2, starting_point3]);
  points.forEach(function(pointt){
    points.push(pointt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function(point){
        drawPoint(ctx, point, '#eeff00', 5);
    });
    let n = points.length; let badTriangles = []; let goodTriangles = [];
    triangles.forEach(function(triangle){
      if(checkIfContains(triangle, points[n-1])){
          badTriangles.push(triangle);
      }
      else{
          goodTriangles.push(triangle);
      }   
    });
    let sides = [];
    badTriangles.forEach(function(triangle){
      // sides.push(getTriangleSides(triangle));
      sides.push(getTriangleSide(triangle[0], triangle[1]));
      sides.push(getTriangleSide(triangle[0], triangle[2]));
      sides.push(getTriangleSide(triangle[1], triangle[2]));
    });
    for(let i = 0; i < sides.length; i++){
      if(sides[i] === 0) 
          continue;
      for(let j = i+1; j < sides.length; j++){
          if(sides[j] === 0) 
              continue;   
          if(checkIfSameLine(sides[i], sides[j])){
              sides[i] = 0;
              sides[j] = 0;
              break;
          }
      }
    }
    while(sides.indexOf(0) != -1){
      let index = sides.indexOf(0);
      let tmp = sides.splice(index, 1);
    }
    triangles = [];
    sides.forEach(function(side){
      side.push(points[n-1]);
      triangles.push(side);
    });
    triangles = triangles.concat(goodTriangles);
  //   triangles.forEach(function(triangle){
  //     drawTriangle(ctx, triangle[0], triangle[1], triangle[2], '#ff0000');
  //   });
  triangles.forEach(function(triangle){
      console.log(triangle);
      if(
          (triangle[0].x === starting_point1.x && triangle[0].y === starting_point1.y) ||
          (triangle[0].x === starting_point2.x && triangle[0].y === starting_point2.y) ||
          (triangle[0].x === starting_point3.x && triangle[0].y === starting_point3.y) ||
          (triangle[1].x === starting_point1.x && triangle[1].y === starting_point1.y) ||
          (triangle[1].x === starting_point2.x && triangle[1].y === starting_point2.y) ||
          (triangle[1].x === starting_point3.x && triangle[1].y === starting_point3.y) ||
          (triangle[2].x === starting_point1.x && triangle[2].y === starting_point1.y) ||
          (triangle[2].x === starting_point2.x && triangle[2].y === starting_point2.y) ||
          (triangle[2].x === starting_point3.x && triangle[2].y === starting_point3.y)
      ){
          console.log('Hello');
        }
      else{
        drawTriangle(ctx, triangle[0], triangle[1], triangle[2], '#ff0000');
        let info = circumcircle(triangle[0], triangle[1], triangle[2]);
        if(points.length > 2)
          drawCircle(ctx, info.x, info.y, info.radius, '#ecf3c180');
      }
      });

  });
}

points = [];
canvas.addEventListener('click', function(event) {
  points.push({x: event.offsetX, y: event.offsetY});
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function(point){
        drawPoint(ctx, point, '#eeff00', 5);
    });
})

