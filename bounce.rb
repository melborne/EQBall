require 'sinatra'
require 'haml'
require 'sass'

configure do
  APP_TITLE = "bball"
  CREDIT = ['hp12c', "http://d.hatena.ne.jp/keyesberry"]
end

get '/' do
  @sliders = %w(size spx spy trail red green blue alpha)
  haml :index
end

before do
  
end

helpers do

end

get '/style.css' do
  scss :style
end

