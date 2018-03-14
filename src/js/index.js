var game={
	minesNum:99,
	gridX:30,
	gridY:16,
	lock:false,
	gridNum:16*30-1,
	
	init:function(){
		var _this =this;
		this.createLi(this.gridNum);
		this.rendomClass();
		this.chooseNum(this.gridX);
		this.showminesNum(99);
		var timer;
		$('.warpper span').eq(0).on('click',function(){
			var tr1 = 0;
			if(!$(this).hasClass('togo')){
				$(this).addClass('togo');
				 timer=setInterval(function(){
				tr1 ++;
				$('.warpper span').eq(0).text(tr1);
				}, 1000);
			}
			_this.lock =true;
				
			
			
		})



		$('.warpper span').eq(1).on('click',function(){
			$(this).toggleClass('togo');
			
			 window.location.reload();
			
		})
		$('ul').bind("contextmenu",function(){
			return false;
		})
		$('ul').on('mouseenter','li',function(){
			if (_this.lock && !$(this).hasClass('white')) {
			$(this).css({opacity:0.4});
			}
		})
		$('ul').on('mouseleave','li',function(){
			if (_this.lock && !$(this).hasClass('white')) {
			$(this).css({opacity:1});
			}
		})
		$('ul').on('click','li',function(){
			if (_this.lock) {
				if(!$(this).hasClass('white')){
				if($(this).hasClass('mines')){
					$(this).addClass('minesshow1');
					
					$('li').addClass('white').css({opacity:1});
					$('.mines').addClass('minesshow')
					setTimeout(function(){
						alert('GAME OVER');
					}, 500);	
					_this.lock =false;
					clearInterval(timer);
				}else{
					var clickNum = $(this).index();
				 _this.spread(clickNum);
				}
			}
			if(_this.win()){
				alert('Win');
				};	
			};
						
	 })
		$('ul li').on('mousedown',function(e){
			if(_this.lock){
			var num = _this.minesNum;
			console.log(num);
				if(num>0){
				if(e.which==3){
				if($(this).hasClass('flag')){
					num++;
					$(this).removeClass('flag');

				}else{
					num--;
					$(this).addClass('flag');
				}
				
				}
			}
			_this.showminesNum(num);
		}
		})

	},
	showminesNum:function(num){
		this.minesNum =num;
		$('.warpper span').eq(2).text(this.minesNum);

	},
	showtimes:function(num){
		this.timer =num;
		$('.warpper span').eq(0).text(this.timer);

	},
	win:function(){
		var win = $('.white').length;
		if(win == 480-99){
			return true;
		}else{
			return false;
		}
	},

	
	createLi:function(len){
		var sum='';
		for(var i =0 ;i<=len ;i++){
		sum +='<li>'+i+'</li>';
		}
		$('ul').append(sum);
		$('ul').css({width:this.gridX*27,height:this.gridY*27});
	},
	rendomClass:function(){
		var minesArray =[];
		for(var i =0 ; i<this.minesNum ; i++){
		minesArray[i] = parseInt(Math.random()*this.gridNum) ;
		}
		minesArray =this.arr99(minesArray);
		console.log(minesArray.length);
		minesArray.forEach(function(ele,index){
		$('li').eq(ele).addClass('mines');
		});
		return minesArray;
	},
	arr99:function(arr){
		var len =arr.length;
		if(len<99){
			var rend = parseInt(Math.random()*this.gridNum) ;
			arr.push(rend);
			this.eg(arr);
			this.arr99(arr);
		}else{
			return arr;
		}
	},
	search:function(arr){
			var index =0;
			for (j=0 ; j< arr.length ;j++){
			if(arr[j] >=0 && arr[j] <=this.gridNum){
			if($('li').eq(arr[j]).hasClass('mines')){
				// console.log(arr[j]);
				index ++;
				}
			}
		}
		return index;
	},
	deleteArr:function(arr,n){
		var edgesNum = this.gridX;
		var leftArr = $('li').eq(arr[0]).position().left;
		var topArr =$('li').eq(arr[0]).position().top;
		
		if(topArr == 0 && leftArr == 0){
			arr = [n,n+1,n+edgesNum,n+edgesNum+1];
		}else if(topArr == 0 && leftArr == 783){
			arr = [n,n-1,n+edgesNum-1,n+edgesNum];
		}else if(topArr == 405 && leftArr == 0){
			arr = [n,n-edgesNum,n-edgesNum+1,n+1];
		}else if(topArr == 405 && leftArr == 783){
			arr = [n,n-edgesNum-1,n-edgesNum,n-1];
		}else if(topArr == 0 && leftArr !== 783 && leftArr !== 0 ){
			arr = [n,n-1,n+1,n+edgesNum-1,n+edgesNum,n+edgesNum+1];
		}else if(topArr == 405 && leftArr !== 783 && leftArr !== 0){
			arr = [n,n-edgesNum-1,n-edgesNum,n-edgesNum+1,n-1,n+1];
		}else if( leftArr == 0 && topArr !== 0 && topArr !== 405){
			arr = [n,n-edgesNum,n-edgesNum+1,n+1,n+edgesNum,n+edgesNum+1];
		}else if(leftArr == 783 && topArr !== 0 && topArr !== 405){
			arr = [n,n-edgesNum-1,n-edgesNum,n-1,n+edgesNum-1,n+edgesNum];
		}else{
			arr =arr ;
		}
	
		return arr;
	},
	chooseNum:function(){
		var edgesNum = this.gridX;
		for(var i =0 ; i<=this.gridNum ; i++){
		var lef =$('li').eq(i).position().left ;
		var top =$('li').eq(i).position().top ;
		var m ;
		var arr =[];
		arr = [i,i-edgesNum-1,i-edgesNum,i-edgesNum+1,i-1,i+1,i+edgesNum-1,i+edgesNum,i+edgesNum+1];
		var n =arr[0];
		arr = this.deleteArr(arr,n);
		m=this.search(arr);
		if ($('li').eq(i).hasClass('mines')) {
			m='<span></span>';

		};
		$('li').eq(i).text(m);
		}
	},
	spread:function(t){
		var re ;
		var edgesNum = this.gridX;
		var str = [t,t-edgesNum-1,t-edgesNum,t-edgesNum+1,t-1,t+1,t+edgesNum-1,t+edgesNum,t+edgesNum+1];
		str = this.deleteArr(str,t);
		console.log(str);
		if($('li').eq(t).text()=='0'){
			$('li').eq(t).text('s').addClass('white').css('color','#888').css({opacity:1});
				for(var k =1 ; k<str.length ;k++){
	 		var type =$('li').eq(str[k]).text();
	 		if($('li').eq(str[k]).text() == 0){
				this.spread(str[k]);	
	 		}else if($('li').eq(str[k]).text() != "x"){
	 			$('li').eq(str[k]).addClass('white').css({opacity:1});
	 		}
	 	}
		}else{
			$('li').eq(t).addClass('white').css({opacity:1});
		}
		 
	},
	eg:function(arr){
		var len =arr.length ;
		for(var i=0 ;i<len ;i++){
			for(var j=i+1 ;j<len ;j++){
				if(arr[i]==this[j]){
					arr.splice(i,1);
					i--;
				}
			}
		}
	}
}
game.init();