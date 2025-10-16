Jekyll::Hooks.register :site, :after_init do |site|
  puts "Building Tailwind CSS..."
  system("npx @tailwindcss/cli -i ./assets/css/main.css -o ./assets/css/styles.css --minify")
  puts "Tailwind CSS built successfully!"
end

if Jekyll.env == 'development'
  Jekyll::Hooks.register :site, :post_write do |site|
    puts "Rebuilding Tailwind CSS..."
    system("npx @tailwindcss/cli -i ./assets/css/main.css -o ./assets/css/styles.css")
  end
end
