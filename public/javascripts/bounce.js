var canvas = {};
var _360 = 2*Math.PI
var ball = {
  radius : 35,
  x : 50,
  y : 50,
  spx : 20,
  spy : 20,
  color : 'rgba(30,30,30,1)'
};
var x = ball.radius, y = ball.radius;
var bg_alpha = 1.0;

$(document).ready(function(){
  canvas.self = $("canvas#bball");
  canvas.ctx = canvas.self[0].getContext('2d');
  canvas.width = canvas.self.width();
  canvas.height = canvas.self.height();
  
  setInterval(function(){ bounce(ball) }, 40);

  $(".slider").slider({ orientation: 'vertical', range: 'min' });
  
  $(".slider#size").slider({ min: 5, max: 75, value: ball.radius,
    slide: function(event, ui){
      ball.radius = ui.value;
      label($(this), ui);
    }
  });
  
  $(".slider#spx,.slider#spy").slider({ min: 5, max: 50, value: ball.spx,
    slide: function(event, ui){
      if ($(this).attr('id')!='spy') {
        ball.spx = ball.spx > 0 ? ui.value : -ui.value;
      } else {
        ball.spy = ball.spy > 0 ? ui.value : -ui.value;
      };
      label($(this), ui);
    }
  });
  
  $(".slider#trail").slider({ min: 0, max: 100, value: bg_alpha*100,
    slide: function(event, ui){
      bg_alpha = ui.value/100;
      label($(this), ui);
     }
  });
  
  $(".slider#red,.slider#green,.slider#blue").slider({ min: 0, max: 255, value:30,
    slide: function(event, ui){
      var c = parseColor(ball.color);
      var id = $(this).attr('id')
      if (id=='red') { c[0] = ui.value }
      else if (id=='green') { c[1] = ui.value } 
      else { c[2] = ui.value };
      ball.color = rgba(c[0], c[1], c[2], c[3]);
      label($(this), ui);
    }
  });

  $(".slider#alpha").slider({ min: 0, max: 10, value: 10,
    slide: function(event, ui){
      var c = parseColor(ball.color);
      var alpha = ui.value/10;
      ball.color = rgba(c[0], c[1], c[2], alpha);
      label($(this), ui);
    }
  });

  $("input").each(function(i) {
    var value = $(".slider").eq(i).slider("value");
    $(this).val(value);
  });

})

function label (obj, ui) {
  var id = obj.attr('id');
  $("input#"+id).val(ui.value);
}

function bounce (ball) {
  rad = ball.radius;
  if (ball.x > canvas.width-rad || ball.x < 0+rad) { ball.spx = -ball.spx };
  if (ball.y > canvas.height-rad || ball.y < 0+rad) { ball.spy = -ball.spy };
  ball.x += ball.spx;
  ball.y += ball.spy;

  var ctx = canvas.ctx
  fadeToClear(bg_alpha);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, rad, 0, _360, true);
  ctx.fillStyle = ball.color;
  ctx.fill();
}

function fadeToClear (alpha) {
  var ctx = canvas.ctx;
  ctx.fillStyle = rgba(255,255,255,alpha);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function rgba (r,g,b,a) {
  return 'rgba(' + [r,g,b,a].join() + ')'
}

function parseColor (color) {
  var colors = color.match(/\d.*\d/)[0].split(',');
  return $.map(colors, function(n) { return parseFloat(n) });
}