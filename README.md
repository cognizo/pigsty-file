A braindead-simple pigsty plugin: it spits events into a JSON log (for
Beaver to consume and fire off to logstash).

You must specify a log location:

    output: {
         file: {
           location: '/var/log/pigsty/events.log',
         }
    }
