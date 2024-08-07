# Generated by Django 5.0.3 on 2024-04-08 18:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.CharField(max_length=2000, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('line1', models.CharField(max_length=2000)),
                ('line2', models.CharField(blank=True, max_length=2000, null=True)),
                ('line3', models.CharField(blank=True, max_length=2000, null=True)),
                ('city', models.CharField(max_length=2000)),
                ('stateCode', models.CharField(max_length=2000)),
                ('postalCode', models.CharField(max_length=2000)),
                ('countryCode', models.CharField(max_length=2000)),
                ('provinceTerritoryCode', models.CharField(blank=True, max_length=2000, null=True)),
                ('type', models.CharField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phoneNumbers', models.CharField(default='000-000-0000', max_length=5000)),
                ('emailAddresses', models.EmailField(default='email@email.com', max_length=5000)),
            ],
        ),
        migrations.CreateModel(
            name='EntranceFee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=2000)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=19)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(max_length=2000)),
                ('credit', models.CharField(max_length=2000)),
                ('title', models.CharField(max_length=2000)),
                ('altText', models.CharField(max_length=2000)),
                ('caption', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='OperatingHour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15000)),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.CharField(max_length=2000, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='Park',
            fields=[
                ('url', models.URLField(max_length=2000)),
                ('fullName', models.CharField(max_length=2000)),
                ('parkCode', models.CharField(primary_key=True, serialize=False, unique=True)),
                ('description', models.TextField()),
                ('latitude', models.CharField(max_length=200, null=True)),
                ('longitude', models.CharField(max_length=200, null=True)),
                ('latLong', models.CharField(max_length=200)),
                ('states', models.CharField(max_length=2000)),
                ('directionsInfo', models.TextField()),
                ('directionsUrl', models.URLField(max_length=2000)),
                ('weatherInfo', models.TextField()),
                ('name', models.CharField(max_length=2000)),
                ('designation', models.CharField(max_length=2000)),
                ('relevanceScore', models.FloatField()),
                ('entrancePasses', models.JSONField(null=True)),
                ('fees', models.JSONField(null=True)),
                ('addresses', models.ManyToManyField(related_name='parks_address', to='allparks_app.address')),
                ('contact', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='park_contact', to='allparks_app.contact')),
                ('entrance_fees', models.ManyToManyField(related_name='parks', to='allparks_app.entrancefee')),
                ('images', models.ManyToManyField(related_name='park', to='allparks_app.image')),
                ('operating_hours', models.ManyToManyField(related_name='parks', to='allparks_app.operatinghour')),
            ],
        ),
        migrations.AddField(
            model_name='contact',
            name='park',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contacts_info', to='allparks_app.park'),
        ),
        migrations.CreateModel(
            name='ParkActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allparks_app.activity')),
                ('park', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allparks_app.park')),
            ],
        ),
        migrations.AddField(
            model_name='park',
            name='activities',
            field=models.ManyToManyField(related_name='parks', through='allparks_app.ParkActivity', to='allparks_app.activity'),
        ),
        migrations.CreateModel(
            name='ParkTopic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('park', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allparks_app.park')),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allparks_app.topic')),
            ],
        ),
        migrations.AddField(
            model_name='park',
            name='topics',
            field=models.ManyToManyField(related_name='parks', through='allparks_app.ParkTopic', to='allparks_app.topic'),
        ),
    ]
