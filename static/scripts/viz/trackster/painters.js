define(["libs/underscore"],function(a){var b=1001,c=1002,d=1003,e=1004,f=1005,g=1006,h=function(a,h){var i,j=a[0],k=a[1],l=h[0],m=h[1];return i=l>j?l>=k?b:m>=k?d:c:j>m?g:m>=k?f:e},i=function(a,c){var d=h(a,c);return d!==b&&d!==g},j=function(a,b,c,d,e,f){void 0===f&&(f=4);var g,h=d-b,i=e-c,j=Math.floor(Math.sqrt(h*h+i*i)/f),k=h/j,l=i/j;for(g=0;j>g;g++,b+=k,c+=l)g%2===0&&a.fillRect(b,c,f,1)},k=function(a,b,c,d){var e=b-d/2,f=b+d/2,g=c-Math.sqrt(3*d/2);a.beginPath(),a.moveTo(e,g),a.lineTo(f,g),a.lineTo(b,c),a.lineTo(e,g),a.strokeStyle=this.fillStyle,a.fill(),a.stroke(),a.closePath()},l=function(a){this.default_val=a?a:1};l.prototype.gen_val=function(){return this.default_val};var m=function(a){this.incomplete_features=a.incomplete_features,this.feature_mapper=a.feature_mapper},n=function(b,c,d,e,f){this.data=b,this.view_start=c,this.view_end=d,this.prefs=a.extend({},this.default_prefs,e),this.mode=f};n.prototype.default_prefs={},n.prototype.draw=function(){},n.prototype.get_start_draw_pos=function(a,b){return this._chrom_pos_to_draw_pos(a,b,-.5)},n.prototype.get_end_draw_pos=function(a,b){return this._chrom_pos_to_draw_pos(a,b,.5)},n.prototype.get_draw_pos=function(a,b){return this._chrom_pos_to_draw_pos(a,b,0)},n.prototype._chrom_pos_to_draw_pos=function(a,b,c){return Math.floor(b*(Math.max(0,a-this.view_start)+c))};var o=function(b,c,d,e,f){n.call(this,b,c,d,e,f),void 0===this.prefs.min_value&&(this.prefs.min_value=a.min(a.map(this.data,function(a){return a[1]}))||0),void 0===this.prefs.max_value&&(this.prefs.max_value=a.max(a.map(this.data,function(a){return a[1]}))||0)};o.prototype.default_prefs={min_value:void 0,max_value:void 0,mode:"Histogram",color:"#000",overflow_color:"#F66"},o.prototype.draw=function(a,b,c,d){var e=!1,f=this.prefs.min_value,g=this.prefs.max_value,h=g-f,i=c,j=this.view_start,k=this.mode,l=this.data;if(a.save(),h>0){var m=Math.round(c+f/h*c);"Intensity"!==k&&(a.fillStyle="#aaa",a.fillRect(0,m,b,1))}else var m=0;a.beginPath();var n,o,p;p=l.length>1?Math.ceil((l[1][0]-l[0][0])*d):10;for(var q=this.prefs.block_color||this.prefs.color,r=parseInt(q.slice(1),16),s=(16711680&r)>>16,t=(65280&r)>>8,u=255&r,v=!1,w=!1,x=0,y=l.length;y>x;x++)if(a.fillStyle=a.strokeStyle=q,v=w=!1,n=Math.ceil((l[x][0]-j)*d),o=l[x][1],null!==o){if(f>o?(w=!0,o=f):o>g&&(v=!0,o=g),"Histogram"===k)o=Math.round(o/h*i),0>o?a.fillRect(n,m,p,-o):a.fillRect(n,m-o,p,o);else if("Intensity"===k){var z=(o-f)/h,A=Math.round(s+(255-s)*(1-z)),B=Math.round(t+(255-t)*(1-z)),C=Math.round(u+(255-u)*(1-z));a.fillStyle="rgb("+A+","+B+","+C+")",a.fillRect(n,0,p,i)}else o=Math.round(i-(o-f)/h*i),e?a.lineTo(n,o):(e=!0,"Filled"===k?(a.moveTo(n,i),a.lineTo(n,o)):a.moveTo(n,o));if(a.fillStyle=this.prefs.overflow_color,v||w){var D;"Histogram"===k||"Intensity"===k?D=p:(n-=2,D=4),v&&a.fillRect(n,0,D,3),w&&a.fillRect(n,i-3,D,3)}a.fillStyle=q}else e&&"Filled"===k&&a.lineTo(n,i),e=!1;"Filled"===k?(e&&(a.lineTo(n,m),a.lineTo(0,m)),a.fill()):a.stroke(),a.restore()};var p=function(a){this.feature_positions={},this.slot_height=a,this.translation=0,this.y_translation=0};p.prototype.map_feature_data=function(a,b,c,d){this.feature_positions[b]||(this.feature_positions[b]=[]),this.feature_positions[b].push({data:a,x_start:c,x_end:d})},p.prototype.get_feature_data=function(a,b){var c,d=Math.floor((b-this.y_translation)/this.slot_height);if(!this.feature_positions[d])return null;a+=this.translation;for(var e=0;e<this.feature_positions[d].length;e++)if(c=this.feature_positions[d][e],a>=c.x_start&&a<=c.x_end)return c.data};var q=function(a,b,c,d,e,f,g){n.call(this,a,b,c,d,e),this.alpha_scaler=f?f:new l,this.height_scaler=g?g:new l,this.max_label_length=200};q.prototype.default_prefs={block_color:"#FFF",connector_color:"#FFF"},a.extend(q.prototype,{get_required_height:function(a,b){var c=this.get_row_height(),d=c,e=this.mode;return("no_detail"===e||"Squish"===e||"Pack"===e)&&(c=a*d),c+this.get_top_padding(b)},get_top_padding:function(){return 0},draw:function(a,b,c,d,e){var f=this.data,g=this.view_start,h=this.view_end;a.save(),a.fillStyle=this.prefs.block_color,a.textAlign="right";for(var i,j=this.get_row_height(),k=new p(j),l=[],n=0,o=f.length;o>n;n++){var q=f[n],r=q[0],s=q[1],t=q[2],u=e&&void 0!==e[r]?e[r].slot:null;("Dense"===this.mode||null!==u)&&h>s&&t>g&&(i=this.draw_element(a,this.mode,q,u,g,h,d,j,b),k.map_feature_data(q,u,i[0],i[1]),(g>s||t>h)&&l.push(q))}return a.restore(),k.y_translation=this.get_top_padding(b),new m({incomplete_features:l,feature_mapper:k})},draw_element:function(){return[0,0]}});var r=10,s=3,t=5,u=10,v=1,w=9,x=3,y=9,z=2,A="#ccc",B=function(a,b,c,d,e,f,g){q.call(this,a,b,c,d,e,f,g),this.draw_background_connector=!0,this.draw_individual_connectors=!1};a.extend(B.prototype,q.prototype,{get_row_height:function(){var a,b=this.mode;return a="Dense"===b?r:"no_detail"===b?s:"Squish"===b?t:u},draw_element:function(a,b,c,d,e,f,g,h,i){var j,k=(c[0],c[1]),l=c[2],m=c[3],n=c[4],o=Math.floor(Math.max(0,(k-e-.5)*g)),p=Math.ceil(Math.min(i,Math.max(0,(l-e-.5)*g))),q=o,r=p,j=("Dense"===b?0:0+d)*h+this.get_top_padding(i),s=null,t=null,u=n&&"+"!==n&&"."!==n?this.prefs.reverse_strand_color:this.prefs.block_color;if(label_color=this.prefs.label_color,a.globalAlpha=this.alpha_scaler.gen_val(c),"Dense"===b&&(d=1),"no_detail"===b)a.fillStyle=u,a.fillRect(o,j+5,p-o,v);else{var B=c[5],C=c[6],D=c[7],E=!0;B&&C&&(s=Math.floor(Math.max(0,(B-e)*g)),t=Math.ceil(Math.min(i,Math.max(0,(C-e)*g))));var F,G;if("Squish"===b?(F=1,G=x,E=!1):"Dense"===b?(F=5,G=w):(F=5,G=y),D){var H,I;"Squish"===b||"Dense"===b?(H=j+Math.floor(x/2)+1,I=1):n?(H=j,I=G):(H+=x/2+1,I=1),this.draw_background_connector&&("Squish"===b||"Dense"===b?a.fillStyle=A:n?"+"===n?a.fillStyle=a.canvas.manager.get_pattern("right_strand"):"-"===n&&(a.fillStyle=a.canvas.manager.get_pattern("left_strand")):a.fillStyle=A,a.fillRect(o,H,p-o,I));for(var J=0,K=D.length;K>J;J++){var L,M,N=D[J],O=Math.floor(Math.max(0,(N[0]-e-.5)*g)),P=Math.ceil(Math.min(i,Math.max((N[1]-e-.5)*g)));if(!(O>P)){if(a.fillStyle=u,a.fillRect(O,j+(G-F)/2+1,P-O,F),void 0!==s&&C>B&&!(O>t||s>P)){var Q=Math.max(O,s),R=Math.min(P,t);a.fillRect(Q,j+1,R-Q,G),1===D.length&&"Pack"===b&&("+"===n?a.fillStyle=a.canvas.manager.get_pattern("right_strand_inv"):"-"===n&&(a.fillStyle=a.canvas.manager.get_pattern("left_strand_inv")),R>Q+14&&(Q+=2,R-=2),a.fillRect(Q,j+1,R-Q,G))}this.draw_individual_connectors&&L&&this.draw_connector(a,L,M,O,P,j),L=O,M=P}}if("Pack"===b){a.globalAlpha=1,a.fillStyle="white";var S=this.height_scaler.gen_val(c),T=Math.ceil(G*S),U=Math.round((G-T)/2);1!==S&&(a.fillRect(o,H+1,p-o,U),a.fillRect(o,H+G-U+1,p-o,U))}}else a.fillStyle=u,a.fillRect(o,j+1,p-o,G),n&&E&&("+"===n?a.fillStyle=a.canvas.manager.get_pattern("right_strand_inv"):"-"===n&&(a.fillStyle=a.canvas.manager.get_pattern("left_strand_inv")),a.fillRect(o,j+1,p-o,G));a.globalAlpha=1,m&&"Pack"===b&&k>e&&(a.fillStyle=label_color,0===e&&o-a.measureText(m).width<0?(a.textAlign="left",a.fillText(m,p+z,j+8,this.max_label_length),r+=a.measureText(m).width+z):(a.textAlign="right",a.fillText(m,o-z,j+8,this.max_label_length),q-=a.measureText(m).width+z))}return a.globalAlpha=1,[q,r]}});var C=function(a,b,c,d,e,f,g,h,i){q.call(this,a,b,c,d,e,f,g),this.ref_seq=h?h.data:null,this.base_color_fn=i};a.extend(C.prototype,q.prototype,{get_row_height:function(){var a,b=this.mode;return"Dense"===b?a=r:"Squish"===b?a=t:(a=u,this.prefs.show_insertions&&(a*=2)),a},_parse_cigar:function(b){var c="MIDNSHP=X",d=[[0,0]],e=d[0],f=0,g=a.map(b.match(/[0-9]+[MIDNSHP=X]/g),function(a){var b=parseInt(a.slice(0,-1),10),g=a.slice(-1);return"N"===g?0!==e[1]&&(e=[f+b,f+b],d.push(e)):-1==="ISHP".indexOf(g)&&(e[1]+=b,f+=b),[c.indexOf(g),b]});return{blocks:d,cigar:g}},draw_read:function(a,b,g,j,l,m,n,o,p,q){var r=function(a,b,c){return-1!=="M=NXD".indexOf(b)&&(a+=c),a},s=function(a,b,c){return-1!=="IX".indexOf(b)&&(a+=c),a},t=function(a){return Math.floor(Math.max(0,(a-l-.5)*g))};a.textAlign="center";var u,v,z=[l,m],B=0,C=0,D=Math.round(g/2),E=a.canvas.manager.char_width_px,F="+"===p?this.prefs.detail_block_color:this.prefs.reverse_strand_color,G="Pack"===b,H=G?y:x,J=j+1,K=new I(a,H,g,b),L=[],M=[],N=this._parse_cigar(o);o=N.cigar,L=N.blocks;for(var O=0;O<L.length;O++){var P=L[O];i([n+P[0],n+P[1]],z)&&(u=t(n+P[0]),v=t(n+P[1]),u===v&&(v+=1),a.fillStyle=F,a.fillRect(u,J,v-u,H))}for(var Q=0,R=o.length;R>Q;Q++){var S=o[Q],T="MIDNSHP=X"[S[0]],U=S[1],V=n+B;if(u=t(V),v=t(V+U),i([V,V+U],z))switch(u===v&&(v+=1),T){case"H":case"S":case"P":break;case"M":B+=U;break;case"=":case"X":var W="";"X"===T?W=q.slice(C,C+U):this.ref_seq&&(W=this.ref_seq.slice(Math.max(0,V-l),Math.min(V-l+U,m-l)));for(var X=Math.max(V,l),Y=0;Y<W.length;Y++)if(W&&!this.prefs.show_differences||"X"===T){var Z=Math.floor(Math.max(0,(X+Y-l)*g));a.fillStyle=this.base_color_fn(W[Y]),G&&g>E?a.fillText(W[Y],Z,j+9):g>.05&&a.fillRect(Z-D,J,Math.max(1,Math.round(g)),H)}"X"===T&&(C+=U),B+=U;break;case"N":a.fillStyle=A,a.fillRect(u,J+(H-1)/2,v-u,1),B+=U;break;case"D":K.draw_deletion(u,J,U),B+=U;break;case"I":var $=u-D;if(i([V,V+U],z)){var _=q.slice(C,C+U);if(this.prefs.show_insertions){var aa=u-(v-u)/2;if(("Pack"===b||"Auto"===this.mode)&&void 0!==q&&g>E){switch(a.fillStyle="yellow",a.fillRect(aa-D,j-9,v-u,9),M[M.length]={type:"triangle",data:[$,j+4,5]},a.fillStyle=A,h([V,V+U],z)){case d:_=_.slice(l-V);break;case e:_=_.slice(0,V-m);break;case f:break;case c:_=_.slice(l-V,V-m)}for(var Y=0,ba=_.length;ba>Y;Y++){var Z=Math.floor(Math.max(0,(V+Y-l)*g));a.fillText(_[Y],Z-(v-u)/2,j)}}else a.fillStyle="yellow",a.fillRect(aa,j+("Dense"!==this.mode?2:5),v-u,"Dense"!==b?x:w)}else("Pack"===b||"Auto"===this.mode)&&void 0!==q&&g>E&&M.push({type:"text",data:[_.length,$,j+9]})}C+=U}else B=r(B,T,U),C=s(C,T,U)}a.fillStyle="yellow";for(var ca,da,ea,O=0;O<M.length;O++)ca=M[O],da=ca.type,ea=ca.data,"text"===da?(a.save(),a.font="bold "+a.font,a.fillText(ea[0],ea[1],ea[2]),a.restore()):"triangle"===da&&k(a,ea[0],ea[1],ea[2])},draw_element:function(a,b,c,d,e,f,g,h,i){{var k=(c[0],c[1]),l=c[2],m=c[3],n=Math.floor(Math.max(-.5*g,(k-e-.5)*g)),o=Math.ceil(Math.min(i,Math.max(0,(l-e-.5)*g))),p=("Dense"===b?0:0+d)*h,q="Pack"===b?y:x;this.prefs.label_color}if(c[5]instanceof Array){var r=!0;c[4][1]>=e&&c[4][0]<=f&&c[4][2]?this.draw_read(a,b,g,p,e,f,c[4][0],c[4][2],c[4][3],c[4][4]):r=!1,c[5][1]>=e&&c[5][0]<=f&&c[5][2]?this.draw_read(a,b,g,p,e,f,c[5][0],c[5][2],c[5][3],c[5][4]):r=!1;var s=Math.ceil(Math.min(i,Math.max(-.5*g,(c[4][1]-e-.5)*g))),t=Math.floor(Math.max(-.5*g,(c[5][0]-e-.5)*g));if(r&&t>s){a.fillStyle=A;var u=p+1+(q-1)/2;j(a,s,u,t,u)}}else this.draw_read(a,b,g,p,e,f,k,c[4],c[5],c[6]);return"Pack"===b&&k>=e&&"."!==m&&(a.fillStyle=this.prefs.label_color,0===e&&n-a.measureText(m).width<0?(a.textAlign="left",a.fillText(m,o+z,p+9,this.max_label_length)):(a.textAlign="right",a.fillText(m,n-z,p+9,this.max_label_length))),[0,0]}});var D=function(a,b,c,d,e,f,g){B.call(this,a,b,c,d,e,f,g),this.longest_feature_length=this.calculate_longest_feature_length(),this.draw_background_connector=!1,this.draw_individual_connectors=!0};a.extend(D.prototype,q.prototype,B.prototype,{calculate_longest_feature_length:function(){for(var a=0,b=0,c=this.data.length;c>b;b++){var d=this.data[b],e=d[1],f=d[2];a=Math.max(a,f-e)}return a},get_top_padding:function(a){var b=this.view_end-this.view_start,c=a/b;return Math.min(128,Math.ceil(this.longest_feature_length/2*c))},draw_connector:function(a,b,c,d,e,f){{var g=(c+d)/2,h=d-g;Math.PI}h>0&&(a.beginPath(),a.arc(g,f,d-g,Math.PI,0),a.stroke())}});var E=function(a,b){this.rgb=Array.isArray(a)?a:6==a.length?a.match(/.{2}/g).map(function(a){return parseInt(a,16)}):7==a.length?a.substring(1,7).match(/.{2}/g).map(function(a){return parseInt(a,16)}):a.split("").map(function(a){return parseInt(a+a,16)}),this.alpha="number"==typeof b?b:1};E.prototype={eval:function(){return this},toCSS:function(){return this.alpha<1?"rgba("+this.rgb.map(function(a){return Math.round(a)}).concat(this.alpha).join(", ")+")":"#"+this.rgb.map(function(a){return a=Math.round(a),a=(a>255?255:0>a?0:a).toString(16),1===a.length?"0"+a:a}).join("")},toHSL:function(){var a,b,c=this.rgb[0]/255,d=this.rgb[1]/255,e=this.rgb[2]/255,f=this.alpha,g=Math.max(c,d,e),h=Math.min(c,d,e),i=(g+h)/2,j=g-h;if(g===h)a=b=0;else{switch(b=i>.5?j/(2-g-h):j/(g+h),g){case c:a=(d-e)/j+(e>d?6:0);break;case d:a=(e-c)/j+2;break;case e:a=(c-d)/j+4}a/=6}return{h:360*a,s:b,l:i,a:f}},toARGB:function(){var a=[Math.round(255*this.alpha)].concat(this.rgb);return"#"+a.map(function(a){return a=Math.round(a),a=(a>255?255:0>a?0:a).toString(16),1===a.length?"0"+a:a}).join("")},mix:function(a,b){color1=this;var c=b,d=2*c-1,e=color1.toHSL().a-a.toHSL().a,f=((d*e==-1?d:(d+e)/(1+d*e))+1)/2,g=1-f,h=[color1.rgb[0]*f+a.rgb[0]*g,color1.rgb[1]*f+a.rgb[1]*g,color1.rgb[2]*f+a.rgb[2]*g],i=color1.alpha*c+a.alpha*(1-c);return new E(h,i)}};var F=function(a,b,c,d){this.start_color=new E(a),this.end_color=new E(b),this.start_value=c,this.end_value=d,this.value_range=d-c};F.prototype.map_value=function(a){return a=Math.max(a,this.start_value),a=Math.min(a,this.end_value),a=(a-this.start_value)/this.value_range,this.start_color.mix(this.end_color,1-a).toCSS()};var G=function(a,b,c,d,e){this.positive_ramp=new F(b,c,0,e),this.negative_ramp=new F(b,a,0,-d),this.start_value=d,this.end_value=e};G.prototype.map_value=function(a){return a=Math.max(a,this.start_value),a=Math.min(a,this.end_value),a>=0?this.positive_ramp.map_value(a):this.negative_ramp.map_value(-a)};var H=function(a,b,c,d,e){n.call(this,a,b,c,d,e);var f,g;if(void 0===this.prefs.min_value){var h=1/0;for(f=0,g=this.data.length;g>f;f++)h=Math.min(h,this.data[f][6]);this.prefs.min_value=h}if(void 0===this.prefs.max_value){var i=-(1/0);for(f=0,g=this.data.length;g>f;f++)i=Math.max(i,this.data[f][6]);this.prefs.max_value=i}};H.prototype.default_prefs={min_value:void 0,max_value:void 0,mode:"Heatmap",pos_color:"#FF8C00",neg_color:"#4169E1"},H.prototype.draw=function(a,b,c,d){var e,f,g,h,i,j,k=this.prefs.min_value,l=this.prefs.max_value,m=this.view_start,n=(this.mode,this.data),o=1/Math.sqrt(2),p=new G(this.prefs.neg_color,"#FFFFFF",this.prefs.pos_color,k,l),q=function(a){return(a-m)*d};a.save(),a.rotate(-45*Math.PI/180),a.scale(o,o);for(var r=0,s=n.length;s>r;r++)e=n[r],f=q(e[1]),g=q(e[2]),h=q(e[4]),i=q(e[5]),j=e[6],a.fillStyle=p.map_value(j),a.fillRect(f,h,g-f,i-h);a.restore()};var I=function(a,b,c,d){this.ctx=a,this.row_height=b,this.px_per_base=c,this.draw_details=("Pack"===d||"Auto"===d)&&c>=a.canvas.manager.char_width_px,this.delete_details_thickness=.2};a.extend(I.prototype,{draw_deletion:function(a,b,c){this.ctx.fillStyle="black";var d=(this.draw_details?this.delete_details_thickness:1)*this.row_height;b+=.5*(this.row_height-d),this.ctx.fillRect(a,b,c*this.px_per_base,d)}});var J=function(a,b,c,d,e,f){n.call(this,a,b,c,d,e),this.base_color_fn=f,this.divider_height=1};return a.extend(J.prototype,n.prototype,{get_row_height:function(){var a,b=this.mode;return a="Dense"===b?r:"Squish"===b?t:u},get_required_height:function(a){var b=this.prefs.summary_height;return a>1&&this.prefs.show_sample_data&&(b+=this.divider_height+a*this.get_row_height()),b},draw:function(b,c,d,e){b.save();var f,g,h,i,j,k,l,m,n,o,p,q=function(a,b){var c=a.length,d=b.length,e=0,f=1,g=null;return"-"===b?(g="deletion",f=a.length):0===a.indexOf(b)&&c>d?(g="deletion",f=c-d,e=d):0===b.indexOf(a)&&d>c&&(g="insertion",f=d-c,e=d),null!==g?{type:g,start:e,len:f}:{}},r=Math.max(1,Math.floor(e)),s=this.data.length?this.data[0][7].split(",").length:0,v="Squish"===this.mode?t:u,w=.1>e?v:"Squish"===this.mode?x:y,z=!0,A=new I(b,v,e,this.mode);1===s&&(v=w=e<b.canvas.manager.char_width_px?this.prefs.summary_height:v,A.row_height=v,z=!1),this.prefs.show_sample_data&&z&&(b.fillStyle="#F3F3F3",b.globalAlpha=1,b.fillRect(0,this.prefs.summary_height-this.divider_height,c,this.divider_height)),b.textAlign="center";for(var B=0;B<this.data.length;B++)if(f=this.data[B],g=f[1],h=f[3],i=[f[4].split(",")],j=f[7].split(","),k=f.slice(8),i=a.map(a.flatten(i),function(b){var c={type:"snp",value:b,start:0},d=q(h,b);return a.extend(c,d)}),!(g<this.view_start||g>this.view_end)){if(z)for(b.fillStyle="#999999",b.globalAlpha=1,p=0;p<i.length;p++)for(m=this.get_start_draw_pos(g+i[p].start,e),b.fillRect(m,0,r,this.prefs.summary_height),n=this.prefs.summary_height,p=0;p<i.length;p++)b.fillStyle="deletion"===i[p].type?"black":this.base_color_fn(i[p].value),allele_frac=k/j.length,draw_height=Math.ceil(this.prefs.summary_height*allele_frac),b.fillRect(m,n-draw_height,r,draw_height),n-=draw_height;if(this.prefs.show_sample_data)for(n=z?this.prefs.summary_height+this.divider_height:0,p=0;p<j.length;p++,n+=v)if(o=j[p]?j[p].split(/\/|\|/):["0","0"],l=null,o[0]===o[1]?"."===o[0]||"0"!==o[0]&&(l=i[parseInt(o[0],10)-1],b.globalAlpha=1):(l="0"!==o[0]?o[0]:o[1],l=i[parseInt(l,10)-1],b.globalAlpha=.5),l)if(m=this.get_start_draw_pos(g+l.start,e),"snp"===l.type){var C=l.value;b.fillStyle=this.base_color_fn(C),A.draw_details?b.fillText(C,this.get_draw_pos(g,e),n+v):b.fillRect(m,n+1,r,w)}else"deletion"===l.type&&A.draw_deletion(m,n+1,l.len)}b.restore()}}),{Scaler:l,LinePainter:o,LinkedFeaturePainter:B,ReadPainter:C,ArcLinkedFeaturePainter:D,DiagonalHeatmapPainter:H,VariantPainter:J}});
//# sourceMappingURL=../../../maps/viz/trackster/painters.js.map