require 'sinatra'
require 'haml'
require 'sass'

configure do
  APP_TITLE = "BounceBall"
  CREDIT = ['hp12c', "http://d.hatena.ne.jp/keyesberry"]
end

get '/' do
  @sliders = %w(size spx spy trail red green blue alpha)
  haml :index
end

get '/style.css' do
  scss :style
end

