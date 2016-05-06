#!/usr/bin/env ruby

require 'open3'

@failure_counter = 0
while true
  # // capture output
  stdout, stderr, status = Open3.capture3('curl -w "@curl-format.txt" -o /dev/null -s -D - localhost:8080/api/status')

  if status.success?
    packet = stdout.split("\n")
    @responseCode = (!packet.nil?) ? packet[0].chomp : 99999
    @responseTime = (!packet.nil?) ? packet.last.chomp : 99999

    code = @responseCode.split(" ")
    if (!code[1].start_with?("2"))
      @failure_counter = @failure_counter+1
    end

  else
    @failure_counter = @failure_counter+1
    # STDERR.puts "OH NO! Hero has died"
  end

  puts "code: #{@responseCode} #{@responseTime} failureCount: #{@failure_counter}"
  sleep 0.01
end


