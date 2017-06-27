define(["libs/underscore","viz/trackster/util","utils/config"],function(a){var b=Backbone.Model.extend({initialize:function(){var c=this.get("key");this.set("id",c);var d=a.find(b.known_settings_defaults,function(a){return a.key===c});d&&this.set(d)},set_value:function(a,b){var c=this.get("type");"float"===c?a=parseFloat(a):"int"===c&&(a=parseInt(a,10)),this.set({value:a},b)}},{known_settings_defaults:[{key:"format",label:"Format",type:"select",default_value:"pdf",options:[{label:"PDF",value:"pdf"},{label:"SVG",value:"svg"},{label:"PNG",value:"png"}]},{key:"names",label:"Track names",type:"bool",value:!0},{key:"yaxis",label:"Y-axis labels",type:"bool",value:!0},{key:"coordinates",label:"Coordinate labels",type:"bool",value:!0}]}),c=Backbone.Collection.extend({model:b,initialize:function(){var c=this,d=["format","names","yaxis","coordinates"];a.each(d,function(a){c.add(new b({key:a}))})},to_key_value_dict:function(){var a={};return this.each(function(b){a[b.get("key")]=b.get("value")}),a},get_value:function(a){var b=this.get(a);return b?b.get("value"):void 0},set_value:function(a,b,c){var d=this.get(a);return d?d.set_value(b,c):void 0},set_default_value:function(a,b){var c=this.get(a);return c?c.set("default_value",b):void 0}},{from_models_and_saved_values:function(b,d){return d&&(b=a.map(b,function(b){return a.extend({},b,{value:d[b.key]})})),new c(b)}}),d=Backbone.View.extend({className:"export-settings-view",initialize:function(){this.collection=new c},render:function(){var b=this.$el;return this.collection.each(function(c,d){if(!c.get("hidden")){var e="param_"+d,f=c.get("type"),g=c.get("value"),h=$("<div class='form-row' />").appendTo(b);if(h.append($("<label />").attr("for",e).text(c.get("label")+":")),"bool"===f)h.append($('<input type="checkbox" />').attr("id",e).attr("name",e).attr("checked",g));else if("select"===f){var i=$("<select />").attr("id",e);a.each(c.get("options"),function(a){$("<option/>").text(a.label).attr("value",a.value).appendTo(i)}),i.val(c.get("default_value")),h.append(i)}else h.append($("<input />").attr("id",e).attr("name",e).val(g));c.help&&h.append($("<div class='help'/>").text(c.help))}}),this},render_in_modal:function(b,c){var d=this,e=function(){Galaxy.modal.hide(),$(window).unbind("keypress.check_enter_esc")},f=function(){Galaxy.modal.hide(),$(window).unbind("keypress.check_enter_esc"),d.update_from_form();var b={};a.each(d.collection.models,function(a){b[a.attributes.key]=a.attributes.value}),c.export_pdf(b)},g=function(a){27===(a.keyCode||a.which)?e():13===(a.keyCode||a.which)&&f()};$(window).bind("keypress.check_enter_esc",g),0===this.$el.children().length&&this.render(),Galaxy.modal.show({title:b||"Export",body:this.$el,buttons:{Cancel:e,OK:f}})},update_from_form:function(){var a=this;this.collection.each(function(b,c){if(!b.get("hidden")){var d="param_"+c,e=a.$el.find("#"+d).val();"bool"===b.get("type")&&(e=a.$el.find("#"+d).is(":checked")),b.set_value(e)}})}});return{ExportSetting:b,ExportSettingCollection:c,ExportSettingCollectionView:d}});
//# sourceMappingURL=../../maps/utils/export.js.map