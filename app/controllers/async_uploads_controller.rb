class AsyncUploadsController < ApplicationController
  
  def index
    @files = Dir[Rails.root.join("public/sample_files/*")].map do |file| 
      next if File.directory?(file)
      file_name = file.match(/\/([\w+\-?]*\.\w+)$/)[1] 
      { name: file_name, link: "/sample_files/#{file_name}" }
    end.compact
  end
  
  
  def new
  end


  def create
    require "file_builder"
    file_to_upload = params["files"]["0"]
    file_path = "public/sample_files"
    file_builder = FileBuilder.new(file_path, file_to_upload['fileName'], file_to_upload['fileContent'])
    file_builder.from_base_64
    redirect_to async_uploads_path
  end

 
end
