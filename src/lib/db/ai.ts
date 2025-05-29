export const ai_db = 
{
  "rec": [
    {
      "architecture": [
        {
          "temp_id": "compute-1",
          "resource_type": "Compute",
          "position": {
            "y": 300,
            "x": 500
          },
          "attributes": {
            "region_id": "ewr",
            "auto_backups": "disabled",
            "id": "",
            "plan": "voc-g-8c-32gb-160s-amd",
            "status": "active",
            "main_ip": "192.168.1.1",
            "label": "Game Server Instance",
            "os_id": 1743,
            "firewall_group_id": "firewall-group-1"
          }
        },
        {
          "temp_id": "managed_db-1",
          "resource_type": "ManagedDatabase",
          "position": {
            "y": 500,
            "x": 500
          },
          "attributes": {
            "region_id": "ewr",
            "id": "",
            "status": "active",
            "plan": "vultr-dbaas-premium-occ-so-24-3840-192",
            "database_engine": "mysql",
            "database_engine_version": 8,
            "latest_backup": "2023-03-15",
            "label": "Game Database"
          }
        },
        {
          "temp_id": "object_storage-1",
          "resource_type": "ObjectStorage",
          "position": {
            "y": 600,
            "x": 700
          },
          "attributes": {
            "tier_id": 5,
            "id": "",
            "cluster_id": 9,
            "label": "Game Assets Storage"
          }
        },
        {
          "temp_id": "firewall_group-1",
          "resource_type": "FirewallGroup",
          "position": {
            "y": 100,
            "x": 500
          },
          "attributes": {
            "id": "",
            "description": "VPC configured as a firewall"
          }
        },
        {
          "temp_id": "firewall_rule-1",
          "resource_type": "FirewallRule",
          "position": {
            "y": 200,
            "x": 580
          },
          "attributes": {
            "id": "",
            "action": "allow",
            "port": "80",
            "ip_type": "ipv4",
            "protocol": "tcp",
            "subnet": "192.168.1.0",
            "subnet_size": 24,
            "notes": "Allow HTTP traffic"
          }
        },
        {
          "temp_id": "firewall_rule-2",
          "resource_type": "FirewallRule",
          "position": {
            "y": 200,
            "x": 420
          },
          "attributes": {
            "id": "",
            "action": "allow",
            "port": "443",
            "ip_type": "ipv4",
            "protocol": "tcp",
            "subnet": "192.168.1.0",
            "subnet_size": 24,
            "notes": "Allow HTTPS traffic"
          }
        }
      ],
      "description": "The architecture strategically positions a compute instance for effective real-time game processing, supported by managed database and object storage, with a robust firewall configuration."
    },
    {
      "architecture": [
        {
          "temp_id": "instance-1",
          "resource_type": "Compute",
          "position": {
            "y": 150,
            "x": 400
          },
          "attributes": {
            "region_id": "ewr",
            "auto_backups": "disabled",
            "id": "",
            "plan": "voc-c-4c-8gb-75s-amd",
            "status": "active",
            "main_ip": "192.168.0.1",
            "label": "Primary Game Server",
            "os_id": 1743,
            "firewall_group_id": "firewall-group-1"
          }
        },
        {
          "temp_id": "managed_db-1",
          "resource_type": "ManagedDatabase",
          "position": {
            "y": 400,
            "x": 400
          },
          "attributes": {
            "region_id": "ewr",
            "id": "",
            "status": "active",
            "plan": "vultr-dbaas-premium-occ-so-24-3840-192",
            "database_engine": "mysql",
            "database_engine_version": 8,
            "latest_backup": "2023-03-15",
            "label": "Primary Game Database"
          }
        },
        {
          "temp_id": "object_storage-1",
          "resource_type": "ObjectStorage",
          "position": {
            "y": 550,
            "x": 400
          },
          "attributes": {
            "tier_id": 5,
            "id": "",
            "cluster_id": 9,
            "label": "Game Assets Storage"
          }
        },
        {
          "temp_id": "firewall_group-1",
          "resource_type": "FirewallGroup",
          "position": {
            "y": 50,
            "x": 400
          },
          "attributes": {
            "id": "",
            "description": "Primary Firewall for Game Server"
          }
        },
        {
          "temp_id": "firewall_rule-1",
          "resource_type": "FirewallRule",
          "position": {
            "y": 100,
            "x": 400
          },
          "attributes": {
            "id": "",
            "action": "allow",
            "port": "80",
            "ip_type": "v4",
            "protocol": "tcp",
            "subnet": "192.168.0.0",
            "subnet_size": 24,
            "notes": "Allow HTTP traffic to Game Server"
          }
        }
      ],
      "description": "This architecture efficiently supports real-time game processing with a powerful compute instance, a managed database, and object storage located in the nearest available region, all secured by a dedicated firewall group."
    },
    {
      "architecture": [
        {
          "temp_id": "instance-1",
          "resource_type": "Compute",
          "position": {
            "y": 320,
            "x": 480
          },
          "attributes": {
            "region_id": "ewr",
            "auto_backups": "disabled",
            "id": "",
            "plan": "vc2-4c-8gb",
            "status": "active",
            "main_ip": "192.168.0.1",
            "label": "Game Server Instance",
            "os_id": 1743,
            "firewall_group_id": "firewall-group-1"
          }
        },
        {
          "temp_id": "managed_db-1",
          "resource_type": "ManagedDatabase",
          "position": {
            "y": 460,
            "x": 480
          },
          "attributes": {
            "region_id": "ewr",
            "id": "",
            "status": "active",
            "plan": "vultr-dbaas-premium-occ-so-24-3840-192",
            "database_engine": "mysql",
            "database_engine_version": 8,
            "latest_backup": "2023-03-15",
            "label": "Game Database"
          }
        },
        {
          "temp_id": "object_storage-1",
          "resource_type": "ObjectStorage",
          "position": {
            "y": 600,
            "x": 480
          },
          "attributes": {
            "tier_id": 5,
            "id": "",
            "cluster_id": 9,
            "label": "Game Assets Storage"
          }
        },
        {
          "temp_id": "firewall_group-1",
          "resource_type": "FirewallGroup",
          "position": {
            "y": 180,
            "x": 480
          },
          "attributes": {
            "id": "",
            "description": "Firewall for Game Services"
          }
        },
        {
          "temp_id": "firewall_rule-1",
          "resource_type": "FirewallRule",
          "position": {
            "y": 250,
            "x": 480
          },
          "attributes": {
            "id": "",
            "action": "allow",
            "port": "80",
            "ip_type": "v4",
            "protocol": "tcp",
            "subnet": "192.168.0.0",
            "subnet_size": 24,
            "notes": "Allow HTTP traffic"
          }
        }
      ],
      "description": "The architecture ensures secure, efficient, and scalable game processing with a firewall, compute instance, and managed database, all configured within the same region for optimal performance."
    }
  ]
}